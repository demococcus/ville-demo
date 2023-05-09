import { Permit } from "src/app/permit/models/permit.model"

export const PERMITS: any = [
  {
      "id": '3',
      "dateCreated": "2023-04-09",
      "status": 2
  },
  {
      "id": '6',
      "dateCreated": "2023-04-17",
      "status": 1
  },
  {
      "id": '7',
      "dateCreated": "2023-04-17",
      "status": 1
  }
]

export const PERMIT: any = {
    "id": '3',
    "dateCreated": "2023-04-09",
    "status": 2,
    "dateModified": null,
    "dateSubmitted": null,
    "centroid": [
        -73.5728703368682,
        45.49651738563629
    ],
    "insideElements": 12,
    "geom": {
        "coordinates": [
            [
                [
                    -73.57305614778714,
                    45.49646817166973
                ],
                [
                    -73.57299980079439,
                    45.49651895299834
                ],
                [
                    -73.57294345380161,
                    45.4965866613646
                ],
                [
                    -73.57286564128792,
                    45.4966148731597
                ],
                [
                    -73.57279856153468,
                    45.49660170765716
                ],
                [
                    -73.57270196668992,
                    45.49656409191826
                ],
                [
                    -73.57269660030968,
                    45.49654716482735
                ],
                [
                    -73.57270733307014,
                    45.49651142984149
                ],
                [
                    -73.57278246239399,
                    45.496451244549974
                ],
                [
                    -73.57287369084382,
                    45.49642115186339
                ],
                [
                    -73.572962236118,
                    45.49645500611581
                ],
                [
                    -73.57305614778714,
                    45.49646817166973
                ]
            ]
        ],
        "type": "Polygon"
    },
    "mapZoom": 18.0,
    "companyName": "Crémerie Bronx",
    "isPrivateCompany": false,
    "certificateNumber": null,
    "firstName": null,
    "lastName": null,
    "phone": null,
    "phoneExt": null,
    "email": null,
    "periodStart": "20230419",
    "periodEnd": "20230422",
    "acceptA": false,
    "acceptB": false,
    "acceptC": false
}


export function getMockPermitsList(): Permit[] {
    return PERMITS as Permit[];
}


export function getMockPermit(): Permit {
    return PERMIT as Permit;
}
