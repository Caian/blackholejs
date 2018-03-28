/**
 * 
 * 
 * 
 * 
 */

THREE.BlackHoleShader = {

	uniforms: {

		"tDiffuse":  { value: null },
		"_Ratio":    { value: 0.0 },
        "_Rad":      { value: 0.0 },
        "_Mul":      { value: 0.0 },
        "_EH":       { value: 0 },
        "_Distance": { value: 0.0 },
        "_Position": { value: null }

	},

	vertexShader: [

        "varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

        "uniform sampler2D tDiffuse;",
        "uniform int _EH;",
        "uniform vec2 _Position;",
        "uniform float _Rad;",
        "uniform float _Mul;",
        "uniform float _Ratio;",
        "uniform float _Distance;",

		"varying vec2 vUv;",

		"void main() {",

            "vec2 offset = vUv - _Position;",
            "vec2 ratio = vec2(_Ratio, 1);",
            "float rad = length(offset / ratio);",
            "float deformation = 1.0/pow(rad*pow(_Distance,0.5),2.0)*_Rad*_Mul;",

            "offset = offset*(1.0-deformation);",
            "offset += _Position;",

            "vec4 color = texture2D(tDiffuse, offset);",

            "if (_EH == 1 && rad * _Distance < _Rad)",
                "color = vec4(0,0,0,1);",

            "gl_FragColor = color;",

		"}"

	].join( "\n" )

};
