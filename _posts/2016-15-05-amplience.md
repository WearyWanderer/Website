---
layout: page-map
title:  "Amplience demo work"
date:   2016-05-15
excerpt: "Language Used: C#, HLSL Shader Programming | Utilities Used: Unity, Github Desktop"
visible: false
tag:
- university
- year 2
- portfolio work
- programming
- unity
comments: false
---


<figure>
	<iframe width="640" height="360" src="https://www.youtube.com/embed/py53zw_bP48" frameborder="0" allowfullscreen> </iframe>
	<figcaption>Demonstration of C# skills along with AI and serialisation techniques</figcaption>
</figure>

<figure>
	<iframe width="640" height="360" src="https://www.youtube.com/embed/3Cc-oHf089o" frameborder="0" allowfullscreen> </iframe>
	<figcaption>Demonstration of Objective-C skills along with mobile modalities</figcaption>
</figure>

<figure>
	<iframe width="640" height="360" src="https://www.youtube.com/embed/mLsQbJsFVTs" frameborder="0" allowfullscreen> </iframe>
	<figcaption>Demonstration of AI pathfinding technique for many-agent usage</figcaption>
</figure>

<figure>
	<iframe width="640" height="360" src="https://www.youtube.com/embed/9Je8bxChois" frameborder="0" allowfullscreen> </iframe>
	<figcaption>Demonstration of third person camera collision/occlusion, GPU accelerated fur-shader</figcaption>
</figure>

Demonstration of HLSL techniques in fur shader
{% highlight csharp %}
void vert ()
{
	fixed mask = tex2Dlod (_FurTex, float4(v.texcoord.xy,0,0)	);
	v.vertex.xyz += v.normal * _FurLength * FUR_MULTIPLIER * mask;
}

struct Input {
	float2 uv_MainTex;
	float3 viewDir;
};

void surf (Input IN, inout SurfaceOutputStandard o) {
	fixed mask = tex2D (_FurTex, IN.uv_MainTex).r;
	o.Alpha = step(lerp(_Cutoff,_CutoffEnd,FUR_MULTIPLIER), mask);

	float alpha = 1 - (FUR_MULTIPLIER * FUR_MULTIPLIER);
	alpha += dot(IN.viewDir, o.Normal) - _EdgeFade;

	o.Alpha *= alpha;
}
{% endhighlight %}

cont -

{% highlight csharp %}
CGPROGRAM
#pragma surface surf Standard fullforwardshadows alpha:blend vertex:vert
#define FUR_MULTIPLIER 0.05
#include "FurHelpers.cginc"
ENDCG

CGPROGRAM
#pragma surface surf Standard fullforwardshadows alpha:blend vertex:vert
#define FUR_MULTIPLIER 0.1
#include "FurHelpers.cginc"
ENDCG

CGPROGRAM
#pragma surface surf Standard fullforwardshadows alpha:blend vertex:vert
#define FUR_MULTIPLIER 0.15
#include "FurHelpers.cginc"
ENDCG
{% endhighlight %}

result -

![FURSHOT1]({{ site.url }}/assets/img/portfolioshots/furshot1.png "Simple shot of fur renderer")
result cont -
![FURSHOT2]({{ site.url }}/assets/img/portfolioshots/furshot2.png "Shot 2")

<figure>
	<iframe width="640" height="360" src="https://www.youtube.com/embed/eBejkf74ALo" frameborder="0" allowfullscreen> </iframe>
	<figcaption>Demonstration of final product from large game development team</figcaption>
</figure>

![FYPLOGO]({{ site.url }}/assets/img/fyp/ExpoTees.png "Modular neural network generation plugin for Unity")

![FYP1]({{ site.url }}/assets/img/fyp/fypshot.png "Demonstration of FYP neural network generation plugin for Unity")

![FYP2]({{ site.url }}/assets/img/fyp/fypshot2.png "Demo shot #2")

Demonstration of excerpts of multithreaded C# server, for C++ SFML clients -
{% highlight csharp %}
    class ReactorListenerServer
    {
        //client tracking
        Dictionary<int, Client> clients = new Dictionary<int, Client>();
        int clientNum = 0;
        //sync management
        AutoResetEvent wait = new AutoResetEvent(false);
        Queue<Event> eventQueue = new Queue<Event>();


        public void ListenForClients()
        {
            string localIP = PortDefinitions.GetLocalIP();

            //Set up our TCP listener for new connection reuqests
            IPEndPoint localEP = new IPEndPoint(IPAddress.Parse(localIP), PortDefinitions.TCP_CONNECT_PORT);
            Socket listener = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

            try
            {
                listener.Bind(localEP);
                listener.Listen(64); //max max backlog of connects is low but just set to this for testing

                while(true) //when we get a connection request from a client
                {
                    wait.Reset();
                    listener.BeginAccept(new AsyncCallback(AcceptClient), listener);
                    wait.WaitOne();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception occured in listening for clients: " + e.Message);
                Environment.Exit(e.HResult);
            }
        }

        public void AcceptClient(IAsyncResult ar)
        {
            wait.Set(); //set our wait handle to ensure sync and don't gobble up memory!
            Random rand = new Random(clientNum);

            //tcp client creation
            Socket listener = (Socket)ar.AsyncState; 
            Socket localTcp = listener.EndAccept(ar);

            //udp client creation
            IPEndPoint localUDPEP = new IPEndPoint(IPAddress.Parse(PortDefinitions.GetLocalIP()), 0); //we request a free port by passing 0 to constructor
            UdpClient udpClient = new UdpClient(localUDPEP);

            //Create our tcp and udp tracking client object here, add it to our management dictionary or map or something
            AddClient(new Client(localTcp, udpClient, ((IPEndPoint)udpClient.Client.LocalEndPoint).Port, localUDPEP, clientNum, rand.Next(40, 1301), 768));
            Client thisClient;
            clients.TryGetValue(clientNum, out thisClient);

            thisClient.tcp.BeginReceive(thisClient.buffer, 0, PortDefinitions.MAXBUFFSIZE, 0, new AsyncCallback(TCPListen), thisClient);
            thisClient.udp.BeginReceive(new AsyncCallback(UDPListen), thisClient);

            eventQueue.Enqueue(new Event(EventType.REQUEST_LOAD_PLAYERS, clientNum));
            eventQueue.Enqueue(new Event(EventType.NEW_CONNECT, clientNum));

            clientNum++;
        }

        public void StartDispatcherThread()
        {
            while (true) //endlessley run distributing our events to the thread pool workers
            {
                if (eventQueue.Count != 0)
                {
                    WorkerTask worker = new WorkerTask(eventQueue.Dequeue(), ref clients);
                    ThreadPool.QueueUserWorkItem(o => WorkerExecution.DoWork(worker), null);
                }
            }
        }

        public void AddClient(Client clientToAdd)
        {
            clients.Add(clientNum, clientToAdd);

            //send back a registration packet
            //TODO - make gen a random position on X, also check what othr data should send back
            byte[] msg = Encoding.ASCII.GetBytes(clientNum.ToString() + ";" + clientToAdd.playerCurrentPos.First);

            clientToAdd.tcp.Send(msg);
        }

        public void TCPListen(IAsyncResult ar)
        {
            Client clientInfo = (Client)ar.AsyncState;
            string msg = System.Text.Encoding.UTF8.GetString(clientInfo.buffer);
            if (msg.Length != 0)
            {
                string typeMsg = msg.Substring(0, msg.IndexOf(';'));

                //lets first check we aren't disconnecting, if we are we neednt waste more time on this client
                if (typeMsg == "disconnect")
                {
                    Console.WriteLine("Client {0} disconnecting, notifying active players...", clientInfo.udpEP.ToString());
                    eventQueue.Enqueue(new Event(EventType.DISCONNECT, clientInfo.uniquePlayerID));
                }
            }
        }
	}
{% endhighlight %}

Some lower level game engine construction, we were restricted to making a game engine with GPU acceleration & had to achieve +60FPS
{% highlight csharp %}
#pragma region DrawingFunctionality
void DrawPixel(int r, int g, int b, int a, BYTE* screenptr, int x, int y)
{
	HAPI_TColour col(r, g, b, a);

	int offset = (x + y * screenWidth) * 4;
	BYTE* pixel = screenptr + offset;
	memcpy(pixel, &col, 4);

}

void ClearBackground(HAPI_TColour colour, BYTE* screenptr)
{
	memset(screenptr, 0, screenHeight * screenWidth * 4);
}

void DrawTexture(Clstexture* texture, BYTE* screenptr, int x, int y, int frameID)
{
	int height;
	int width;
	int destRow = screenWidth;
	BYTE* currentTexPixel;
	BYTE* destScreenPtr = screenptr + (x + y * destRow) * 4;

	height = texture->ReturnHeight();
	width = texture->ReturnWidth();

	//run a check if the frame is needed, otherwise just render texture as normal
	if (texture->checkIfSpritesheet())
		currentTexPixel = texture->ReturnPtr(frameID);
	else
		currentTexPixel = texture->ReturnPtr();


	//optimised to do whole rows at a time
	for (int i = 0; i < height; ++i)
	{
		memcpy(destScreenPtr, currentTexPixel, (width * 4));

		//advance to next row of pixels on screen
		currentTexPixel += width * 4;
		destScreenPtr += destRow * 4;

	}

}

void DrawTextureAlpha(Clstexture* texture, BYTE* screenptr, int x, int y, int frameID)
{
	int height;
	int width;
	int destRow = screenWidth;
	BYTE* currentTexPixel;
	BYTE* destScreenPtr = screenptr + (x + y * destRow) * 4;

	height = texture->ReturnHeight();
	width = texture->ReturnWidth();

	//run a check if the frame is needed, otherwise just render texture as normal
	if (texture->checkIfSpritesheet())
		currentTexPixel = texture->ReturnPtr(frameID);
	else
		currentTexPixel = texture->ReturnPtr();

	//create a HAPI colour struct and copy the current pixel's data into it to check for opacity. Then decide whether to blend [NOTE: Refactored to just overwrite each frame rather than reinitialising a new HAPI_TColour ever frame
	HAPI_TColour colour;
	HAPI_TColour screenPixelColour;

	//because of the individual checking of pixels for the alpha channel, needed to do all pixels seperately
	for (int y = 0; y < height; ++y)
	{
		for (int x = 0; x < width; ++x)
		{
			int offset = (x + y * width) * 4;	

			//memcpy(&colour, currentTexPixel + offset, 4);
			BYTE* colour = currentTexPixel + offset;
			if (colour[3] != 0)
			{
				if (colour[3] == 255)
				{
					*((DWORD*)(destScreenPtr + offset)) = *((DWORD*)colour);
					//memcpy(destScreenPtr + offset, currentTexPixel + offset, 4);
				}
				else
				{
					*((DWORD*)&screenPixelColour) = *((DWORD*)(destScreenPtr + offset));
					//memcpy(&screenPixelColour, destScreenPtr + offset, 4);

					//blend the taken pixel with what we are adding to it, factor in the alpha channel
					screenPixelColour.blue = screenPixelColour.blue + ((colour[3] * (colour[0] - screenPixelColour.blue)) >> 8);
					screenPixelColour.green = screenPixelColour.green + ((colour[3] * (colour[1] - screenPixelColour.green)) >> 8);
					screenPixelColour.red = screenPixelColour.red + ((colour[3] * (colour[2] - screenPixelColour.red)) >> 8);

					*((DWORD*)(destScreenPtr + offset)) = *((DWORD*)&screenPixelColour);
					//memcpy(destScreenPtr + offset, &screenPixelColour, 4);
				}
			}
		}
		destScreenPtr += (destRow - width) * 4;
	}
}
{% endhighlight %}

Brownian/Bezier functions
{% highlight csharp %}
glm::vec3 Brownian(const glm::vec3& pos, float frequency, int octaves, float lacunarity, float gain, float scale)
	{
		double total = 0.0f;
		float amplitude = gain;

		for (size_t i = 0; i < octaves; ++i)
		{
			total += PerlinNoise((float)pos.x * frequency, (float)pos.z * frequency) * amplitude;
			frequency *= lacunarity;
			amplitude *= gain;
		}

		return glm::vec3(pos.x, pos.y + (total * scale), pos.z);
	}

	glm::vec3 CalculateBezier(const std::vector<glm::vec3>& cps, float t)
	{
		float temps[4];

		temps[0] = (1 - t) * (1 - t) * (1 - t); //pow() unecessary overhead so do not call
		temps[1] = 3 * t * (1 - t) * (1 - t);
		temps[2] = 3 * (1 - t) * t * t;
		temps[3] = t * t * t;

		return (
			cps[0] * temps[0] +
			cps[1] * temps[1] +
			cps[2] * temps[2] +
			cps[3] * temps[3]
			);
	}

	glm::vec3 BezierPatchSixteenPoints(const std::vector<glm::vec3>& cps, float u, float v)
	{
		std::vector<glm::vec3> Pu{ 4 };
		// compute 4 control points along u direction
		for (int i = 0; i < 4; ++i)
		{
			std::vector<glm::vec3> curveP{ 4 };
			curveP[0] = cps[i * 4];
			curveP[1] = cps[i * 4 + 1];
			curveP[2] = cps[i * 4 + 2];
			curveP[3] = cps[i * 4 + 3];
			Pu[i] = CalculateBezier(curveP, u);
		}
		// compute final position on the surface using v
		return CalculateBezier(Pu, v);
	}
{% endhighlight %}

I implemented a `CameraCollisionFrame` class as a member variable of my third person camera script (Along with making use of debug drawing in the scene editor in Unity.) In the update loop of the camera, I used raycasts from each point in the collision frame to the character position in order to check that the view isn't obstructed. If it is, move forwards until we can see the character:
{% highlight csharp %}
//Collision checker
bool IsCollisionAtPoints(Vector3[] points, Vector3 playerPos, CollisionType type)
{
	Debug.DrawLine(playerPos, m_camera.transform.position + m_camera.transform.forward * -m_camera.nearClipPlane, Color.red);

	for (int i = 0; i < points.Length; i++)
	{
		if (i != points.Length - 1)
			Debug.DrawLine(playerPos, points[i]);
	}

	for (int i = 0; i < points.Length; i++)
	{
		Ray ray = new Ray(playerPos, points[i] - playerPos);
		float dist = Vector3.Distance(points[i], playerPos);
		LayerMask layerToCheck = LayerMask.GetMask(LayerMask.LayerToName((int)type));
		if (Physics.Raycast(ray, dist, layerToCheck))
			return true;
	}

	return false;
}


//Check what distance we need to have a successful view frame
public float CalcAdjustedDistanceRay(Vector3 from)
{
	float dist = -1;

	for (int i = 0; i < originCamPoints.Length; i++)
	{
		Ray ray = new Ray(from, originCamPoints[i] - from);
		RaycastHit hit;

		if (Physics.Raycast(ray, out hit))
		{
			if (dist == -1)
				dist = hit.distance;
			else
			{
				if (hit.distance < dist)
					dist = hit.distance;
			}
		}
	}

	return (dist == -1) ? 0 : dist;
}
{% endhighlight %}


      
