---
layout: page-map
title:  "Advanced Games Development"
date:   2016-05-15
excerpt: "Language Used: C#, HLSL Shader Programming | Utilities Used: Unity, Github Desktop"
visible: false
tag:
- university
- year 3
- portfolio work
- programming
- unity
comments: false
---

<figure>
	<iframe width="640" height="360" src="https://www.youtube.com/embed/eBejkf74ALo" frameborder="0" style="float:center" allowfullscreen> </iframe>
	<figcaption>Demonstration of C# skills along with AI and serialisation techniques</figcaption>
</figure>

Demonstration of HLSL/CG shader programming in fur shader
{% highlight csharp %}
void vert ()
{
	fixed mask = tex2Dlod (_FurTex, float4(v.texcoord.xy,0,0));
	v.vertex.xyz += v.normal * _FurLength * FUR_MULTIPLIER * mask;
}

struct Input 
{
	float2 uv_MainTex;
	float3 viewDir;
};

void surf (Input IN, inout SurfaceOutputStandard o) 
{
	fixed mask = tex2D (_FurTex, IN.uv_MainTex).r;
	o.Alpha = step(lerp(_Cutoff,_CutoffEnd,FUR_MULTIPLIER), mask);

	float alpha = 1 - (FUR_MULTIPLIER * FUR_MULTIPLIER);
	alpha += dot(IN.viewDir, o.Normal) - _EdgeFade;

	o.Alpha *= alpha;
}
{% endhighlight %}


      
