
// Cube
var facesCube = [
    { // left
      uvRow: 0,
      dir: [ -1,  0,  0, ],
      corners: [
        { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
        { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
        { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
        { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
        
      ],
    },
    { // right
      uvRow: 0,
      dir: [  1,  0,  0, ],
      corners: [
        { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
        { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
        { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
        { pos: [ 1, 0, 0 ], uv: [ 1, 0 ], },
      ],
    },
    { // bottom
      uvRow: 1,
      dir: [  0, -1,  0, ],
      corners: [
        { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
        { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
        { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
        { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
      ],
    },
    { // top
      uvRow: 2,
      dir: [  0,  1,  0, ],
      corners: [
        { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
        { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
        { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
        { pos: [ 1, 1, 0 ], uv: [ 0, 0 ], },
      ],
    },
    { // back
      uvRow: 0,
      dir: [  0,  0, -1, ],
      corners: [
        { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
        { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
        { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
        { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
      ],
    },
    { // front
      uvRow: 0,
      dir: [  0,  0,  1, ],
      corners: [
        { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
        { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
        { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
        { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
      ],
    },
  ]



// Hypotenuse1
var facesHypotenuse1 = [
      { // left
        uvRow: 0,
        dir: [ -1,  0,  0, ],
        corners: [
          { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
          { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
          { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
          { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
          
        ],
      },
      { // bottom
        uvRow: 1,
        dir: [ 0, -1, 0, ],
        corners: [
          { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
          { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
          { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
        ],
      },
      { // top
        uvRow: 2,
        dir: [ 1, 1, 0, ],
        corners: [
          { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
          { pos: [ 1, 0, 1 ], uv: [ 0, 1 ], },
          { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
        ],
      },
      { // back
        uvRow: 0,
        dir: [  0,  0, -1, ],
        corners: [
          { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
          { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 0, 1 ], },
          { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
        ],
      },
      { // front
        uvRow: 0,
        dir: [  0,  0,  1, ],
        corners: [
          { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
          { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
          { pos: [ 1, 0, 1 ], uv: [ 1, 1 ], },
        ],
      },
    ]

    

// Hypotenuse2
var facesHypotenuse2 = [
  { // right
    uvRow: 0,
    dir: [  1,  0,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 0 ], },
    ],
  },
  { // left
    uvRow: 0,
    dir: [  -1,  0,  0, ],
    corners: [
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
    ],
  },
  { // bottom
    uvRow: 1,
    dir: [  0, -1,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // top
    uvRow: 2,
    dir: [  0,  1,  1, ],
    corners: [
      { pos: [ 0, 0, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 1 ], },
      { pos: [ 0, 1, 0 ], uv: [ 0, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 0 ], },
    ],
  },
  { // back
    uvRow: 0,
    dir: [  0,  0, -1, ],
    corners: [
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
    ],
  },
]



// Hypotenuse3
var facesHypotenuse3 = [
  { // right
    uvRow: 0,
    dir: [  1,  0,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
    ],
  },
  { // bottom
    uvRow: 1,
    dir: [  0, -1,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // top
    uvRow: 2,
    dir: [  -1,  1,  0, ],
    corners: [
      { pos: [ 0, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 1 ], uv: [ 1, 1 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
    ],
  },
  { // back
    uvRow: 0,
    dir: [  0,  0, -1, ],
    corners: [
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // front
    uvRow: 0,
    dir: [  0,  0,  1, ],
    corners: [
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
    ],
  },
]



// Hypotenuse4
var facesHypotenuse4 = [
  { // right
    uvRow: 0,
    dir: [  1,  0,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
    ],
  },
  { // left
    uvRow: 0,
    dir: [ -1,  0,  0, ],
    corners: [
      { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
    ],
  },
  { // bottom
    uvRow: 1,
    dir: [  0, -1,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // top
    uvRow: 2,
    dir: [  0,  1,  -1, ],
    corners: [
      { pos: [ 1, 0, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 0 ], },
    ],
  },
  { // front
    uvRow: 0,
    dir: [  0,  0,  1, ],
    corners: [
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
    ],
  },
]



// Triangle1
var facesTriangle1 = [
      { // left
        uvRow: 0,
        dir: [ -1,  0,  0, ],
        corners: [
          { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
          { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
          { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
          { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
          
        ],
      },
      { // bottom
        uvRow: 1,
        dir: [  0, -1,  0, ],
        corners: [
          { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
          { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
          { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
        ],
      },
      { // top
        uvRow: 2,
        dir: [  1,  1,  0, ],
        corners: [
          { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
          { pos: [ 1, 0, 1 ], uv: [ 0, 1 ], },
          { pos: [ 0, 1, 0 ], uv: [ 1, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
        ],
      },
      { // back
        uvRow: 0,
        dir: [  0,  0, -1, ],
        corners: [
          { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
          { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 0, 1 ], },
          { pos: [ 0, 1, 0 ], uv: [ 1, 1 ], },
        ],
      },
      { // front
        uvRow: 0,
        dir: [  0,  1,  1, ],
        corners: [
          { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
          { pos: [ 0, 1, 0 ], uv: [ 0, 1 ], },
          { pos: [ 1, 0, 1 ], uv: [ 1, 1 ], },
        ],
      },
    ]

    

// Triangle2
var facesTriangle2 = [
  { // left
    uvRow: 0,
    dir: [ -1,  1,  0, ],
    corners: [
      { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
      
    ],
  },
  { // bottom
    uvRow: 1,
    dir: [  0, -1,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // right
    uvRow: 2,
    dir: [  1,  0,  0, ],
    corners: [
      { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
    ],
  },
  { // back
    uvRow: 0,
    dir: [  0,  0, -1, ],
    corners: [
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 0 ], uv: [ 1, 1 ], },
    ],
  },
  { // front
    uvRow: 0,
    dir: [  0,  1,  1, ],
    corners: [
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 0 ], uv: [ 0, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 1 ], },
    ],
  },
]



// Triangle3
var facesTriangle3 = [
  { // left
    uvRow: 0,
    dir: [ -1,  1,  0, ],
    corners: [
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
      
    ],
  },
  { // bottom
    uvRow: 1,
    dir: [  0, -1,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // top
    uvRow: 2,
    dir: [  1,  0,  0, ],
    corners: [
      { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 1, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
    ],
  },
  { // back
    uvRow: 0,
    dir: [  0,  1, -1, ],
    corners: [
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 0, 1 ], },
      { pos: [ 1, 1, 1 ], uv: [ 1, 1 ], },
    ],
  },
  { // front
    uvRow: 0,
    dir: [  0,  0,  1, ],
    corners: [
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 1, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 1 ], },
    ],
  },
]



// Triangle4
var facesTriangle4 = [
  { // left
    uvRow: 0,
    dir: [ -1,  0,  0,],
    corners: [
      { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
    ],
  },
  { // bottom
    uvRow: 1,
    dir: [  0, -1,  0, ],
    corners: [
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
      { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
    ],
  },
  { // top
    uvRow: 2,
    dir: [  1,  1,  0, ],
    corners: [
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 0, 1 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
    ],
  },
  { // back
    uvRow: 0,
    dir: [  0,  1, -1, ],
    corners: [
      { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
      { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
      { pos: [ 1, 0, 0 ], uv: [ 0, 1 ], },
      { pos: [ 0, 1, 1 ], uv: [ 1, 1 ], },
    ],
  },
  { // front
    uvRow: 0,
    dir: [  0,  0,  1, ],
    corners: [
      { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
      { pos: [ 0, 1, 1 ], uv: [ 0, 1 ], },
      { pos: [ 1, 0, 1 ], uv: [ 1, 1 ], },
    ],
  },
]



// Pyramid
var facesPyramid = [
      { // left
        uvRow: 0,
        dir: [ -0.33,  0,  0, ],
        corners: [
          { pos: [ 0.5, 1, 0.5 ], uv: [ 0, 1 ], },
          { pos: [ 0, 0, 0 ], uv: [ 0, 0 ], },
          { pos: [ 0.5, 1, 0.5 ], uv: [ 1, 1 ], },
          { pos: [ 0, 0, 1 ], uv: [ 1, 0 ], },
          
        ],
      },
      { // bottom
        uvRow: 1,
        dir: [  0, -1,  0, ],
        corners: [
          { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
          { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 1, 1 ], },
          { pos: [ 0, 0, 0 ], uv: [ 0, 1 ], },
        ],
      },
      { // right
        uvRow: 2,
        dir: [  0.33,  0,  0, ],
        corners: [
          { pos: [ 0.5, 1, 0.5 ], uv: [ 1, 1 ], },
          { pos: [ 1, 0, 1 ], uv: [ 0, 1 ], },
          { pos: [ 0.5, 1, 0.5 ], uv: [ 1, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
        ],
      },
      { // back
        uvRow: 0,
        dir: [  0,  0, -0.33, ],
        corners: [
          { pos: [ 1, 0, 0 ], uv: [ 0, 0 ], },
          { pos: [ 0, 0, 0 ], uv: [ 1, 0 ], },
          { pos: [ 1, 0, 0 ], uv: [ 0, 1 ], },
          { pos: [ 0.5, 1, 0.5 ], uv: [ 1, 1 ], },
        ],
      },
      { // front
        uvRow: 0,
        dir: [  0,  0,  0.33, ],
        corners: [
          { pos: [ 0, 0, 1 ], uv: [ 0, 0 ], },
          { pos: [ 1, 0, 1 ], uv: [ 1, 0 ], },
          { pos: [ 0.5, 1, 0.5 ], uv: [ 0, 1 ], },
          { pos: [ 1, 0, 1 ], uv: [ 1, 1 ], },
        ],
      },
    ]


  
// Column
var facesColumn = [
  {
    uvRow: 0,
    dir: [ 0,  -1,  0, ],
    corners: [
      { pos: [1, 0, 0.5], uv: [ 0, 1 ], },
      { pos: [0.5, 0, 1], uv: [ 0, 1 ], },
      { pos: [0.5, 0, 0], uv: [ 0, 1 ], },
      { pos: [0, 0, 0.5], uv: [ 0, 1 ], },
      
    ],
  },
  { 
    uvRow: 0,
    dir: [  -1, 0, 0, ],
    corners: [
      { pos: [0, 0, 0.5], uv: [ 0, 1 ], },
      { pos: [0.5, 0, 1], uv: [ 0, 1 ], },
      { pos: [0, 1, 0.5], uv: [ 0, 1 ], },
      { pos: [0.5, 1, 1], uv: [ 0, 1 ], },
    ],
  },
  { 
    uvRow: 1,
    dir: [  0, 0,  -1, ],
    corners: [
      { pos: [0.5, 0, 0], uv: [ 0, 1 ], },
      { pos: [0, 0, 0.5], uv: [ 0, 1 ], },
      { pos: [0.5, 1, 0], uv: [ 0, 1 ], },
      { pos: [0, 1, 0.5], uv: [ 0, 1 ], },
    ],
  },
  { 
    uvRow: 2,
    dir: [  1,  0,  0, ],
    corners: [
      { pos: [1, 0, 0.5], uv: [ 0, 1 ], },
      { pos: [0.5, 0, 0], uv: [ 0, 1 ], },
      { pos: [1, 1, 0.5], uv: [ 0, 1 ], },
      { pos: [0.5, 1, 0], uv: [ 0, 1 ], },
    ],
  },
  { 
    uvRow: 0,
    dir: [  0,  0, 1, ],
    corners: [
      { pos: [0.5, 0, 1], uv: [ 0, 1 ], },
      { pos: [1, 0, 0.5], uv: [ 0, 1 ], },
      { pos: [0.5, 1, 1], uv: [ 0, 1 ], },
      { pos: [1, 1, 0.5], uv: [ 0, 1 ], },
    ],
  },
  {
    uvRow: 0,
    dir: [  0,  1,  0, ],
    corners: [
      { pos: [0.5, 1, 1], uv: [ 0, 1 ], },
      { pos: [1, 1, 0.5], uv: [ 0, 1 ], },
      { pos: [0, 1, 0.5], uv: [ 0, 1 ], },
      { pos: [0.5, 1, 0], uv: [ 0, 1 ], },
    ],
  },
]



export { 
  facesCube, 
  facesHypotenuse1, facesHypotenuse2, facesHypotenuse3, facesHypotenuse4, 
  facesTriangle1, facesTriangle2, facesTriangle3, facesTriangle4, 
  facesPyramid, 
  facesColumn 
};