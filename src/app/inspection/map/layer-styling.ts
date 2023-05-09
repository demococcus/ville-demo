import { Expression, StyleFunction } from "mapbox-gl"

export const color = {
    green: 'rgba(0,128,0,1)',
    cyan: 'rgba(0,255,255,1)',
    yellow: 'rgba(255,255,0,1)',
    red: 'rgba(255,0,0,1)',
    black: 'rgba(0,0,0,1)',
    blue: 'rgba(0,0,255,1)',
    gray: 'rgba(105,105,105,1)',
    silver: 'rgba(192,192,192,1)'
}

export const fhGeneralPaint = {
    'circle-radius': 7,
    'circle-color': color.red,
    'circle-stroke-width': 1,
    'circle-stroke-color': color.black
}

export const fhPressurePaint = {
    'circle-radius': 7,
    'circle-color': [
        "step",
        ["get", "pressure"],
        color.red,
        20,
        color.green,
        50,
        color.yellow,
        70,
        color.cyan
    ],
    'circle-stroke-width': 1,
    'circle-stroke-color': color.black
}


export const fhRepairPaint = {
    'circle-radius': 7,
    'circle-color': [
        "step",
        ["get", "repair"],
        color.green,
        1,
        color.red,
    ],
    'circle-stroke-width': 1,
    'circle-stroke-color': color.black
}


export const aqLabelLayout: any = {
    'visibility': 'visible',
    'text-field': ['to-string', ['get', 'id']],
    'text-offset': [0, -1.5]        
}


export const aqLabelLayoutThematic = {
    'visibility': 'visible',
    'text-field': ['to-string', ['get', 'id']],
    'text-offset': [0, -1.5]    
}

export const aqPipePaint = {
    'line-color': color.blue,
    'line-width': 2
}

export const aqPipePaintThematic = {
    'line-color': color.silver,
    'line-width': 2
}


export const swPipeGeneralPaint = {
    'line-color': color.green,
    'line-width': 5
}

export const swMaterialPaint = {
    'line-color': [
        "match",
        ["get", "material"],
        ["PVC"], color.cyan,
        ["Clay"], color.black,
        color.gray
      ],
    'line-width': 5
}


export const swLabelLayout: any = {
    'visibility': 'visible',
    'text-field': ['to-string', ['get', 'year']],
    'text-offset': [0, -1],
    'symbol-placement': "line-center",  
    'text-size': 14,      
}

export const labelPaint = {'text-color': '#000000'};

export const labelPaintThematic = {'text-color': '#808080'};