import {MaterialsType} from "../helpers/roomTypes";

export const MaterialsAPI = {
    categories: [
        {
            "value": "Kitchen",
            "img": "Kitchen.jpg"
        },
        {
            "value": "Vanity",
            "img": "Vanity.jpg"
        },
        {
            "value": "Build In Closet",
            "img": "build-in.jpg"
        },
        {
            "value": "Leather Closet",
            "img": "Leather Closet.jpg"
        },
        {
            "value": "RTA Closet",
            "img": "RTA Closet.jpg"
        },
        {
            "value": "Cabinet System Closet",
            "img": "Cabinet_System_Closet.jpg"
        }
    ],
    doors: [
        {
            "value": "No Doors",
            "img": "No Doors.jpg",
            "finish": [
                {
                    "value": "No Doors No Hinges",
                    "img": "No Doors.jpg"
                }
            ]
        },
        {
            "value": "Standard Size Shaker",
            "img": "Doors Shaker Standard.jpg",
            "finish": []
        },
        {
            "value": "Slab",
            "img": "Doors Slab.jpg",
            "finish": [
                {
                    "value": "Milino",
                    "img": "milino.jpg",
                    "colors": [
                        {
                            "value": "White Melamine",
                            "img": "White-Melamine.jpg"
                        },
                        {
                            "value": "Grey Melamine",
                            "img": "Gray-Melamine.jpg"
                        },
                        {
                            "value": "Grey Linen Melamine",
                            "img": "Gray-Linen-Melamine.jpg"
                        },
                        {
                            "value": "Beige Linen Melamine",
                            "img": "Beige-Linen-Melamine.jpg"
                        },
                        {
                            "value": "Ash Melamine",
                            "img": "Ash-Melamine-1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Walnut Melamine",
                            "img": "Walnut-Melamine.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brown Oak",
                            "img": "Brown Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ivory Woodline",
                            "img": "Ivory Woodline.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Sable Wood",
                            "img": "Sable Wood.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Grey Woodline",
                            "img": "Grey Woodline.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "White Oak",
                            "img": "White Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Desert Oak",
                            "img": "Desert Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Glacier Oak",
                            "img": "Glacial_Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ultra Matte White",
                            "img": "Ultra Matte White.jpg"
                        },
                        {
                            "value": "Ultra Matte Grey",
                            "img": "Ultra Matte Grey.jpg"
                        },
                        {
                            "value": "Ultra Matte Cashmere",
                            "img": "Cashmere.jpg"
                        },
                        {
                            "value": "Ultra Matte Gris",
                            "img": "UltraMatte Gris.jpg"
                        },
                        {
                            "value": "Ultra Matte Volcano",
                            "img": "UltraMatte_Volcano.jpg"
                        },
                        {
                            "value": "White Gloss",
                            "img": "White.jpg"
                        }
                    ]
                },
                {
                    "value": "Syncron",
                    "img": "syncron.jpg",
                    "colors": [
                        {
                            "value": "Alhambra 1",
                            "img": "Alhambra 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Alhambra 2",
                            "img": "Alhambra 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Alhambra 3",
                            "img": "Alhambra 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Black Minerva",
                            "img": "Black Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Cashmere Minerva",
                            "img": "Cashmere Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Black",
                            "img": "Reeded Black.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Blanco",
                            "img": "Reeded Blanco.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Cashmere",
                            "img": "Reeded Cashmere.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 4",
                            "img": "Rosales 4.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 1",
                            "img": "Velazquez 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 2",
                            "img": "Velazquez 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 5",
                            "img": "Velazquez 5.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "White Minerva",
                            "img": "White Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Anniversary Oak 2",
                            "img": "Anniversary Oak 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Bernini",
                            "img": "Bernini.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brushed Concrete 1",
                            "img": "Brushed Concrete 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brushed Concrete 2",
                            "img": "Brushed Concrete 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Como Ash 1",
                            "isGrain": true,
                            "img": "Como Ash 1.jpg"
                        },
                        {
                            "value": "Como Ash 2",
                            "isGrain": true,
                            "img": "Como Ash 2.jpg"
                        },
                        {
                            "value": "Como Ash 3",
                            "isGrain": true,
                            "img": "Como Ash 3.jpg"
                        },
                        {
                            "value": "Evora 4",
                            "isGrain": true,
                            "img": "Evora 4.jpg"
                        },
                        {
                            "value": "Frappe 1",
                            "img": "Frappé 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Frappe 3",
                            "img": "Frappé 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ice 1",
                            "isGrain": true,
                            "img": "Ice 1.jpg"
                        },
                        {
                            "value": "Ida 1",
                            "isGrain": true,
                            "img": "Ida 1.jpg"
                        },
                        {
                            "value": "Ida 2",
                            "isGrain": true,
                            "img": "Ida 2.jpg"
                        },
                        {
                            "value": "Ida 3",
                            "isGrain": true,
                            "img": "Ida 3.jpg"
                        },
                        {
                            "value": "Lakeland Oak 3",
                            "isGrain": true,
                            "img": "Lakeland Oak 3.jpg"
                        },
                        {
                            "value": "Muratti 1",
                            "isGrain": true,
                            "img": "Muratti 1.jpg"
                        },
                        {
                            "value": "Muratti 2",
                            "isGrain": true,
                            "img": "Muratti 2.jpg"
                        },
                        {
                            "value": "Muratti 3",
                            "isGrain": true,
                            "img": "Muratti 3.jpg"
                        },
                        {
                            "value": "Muratti 4",
                            "isGrain": true,
                            "img": "Muratti 4.jpg"
                        },
                        {
                            "value": "Nocce 1",
                            "isGrain": true,
                            "img": "Nocce 1.jpg"
                        },
                        {
                            "value": "Nocce 3",
                            "isGrain": true,
                            "img": "Nocce 3.jpg"
                        },
                        {
                            "value": "Olmo 3",
                            "isGrain": true,
                            "img": "Olmo 3.jpg"
                        },
                        {
                            "value": "Picasso 1",
                            "img": "Picasso 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Picasso 2",
                            "img": "Picasso 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Picasso 3",
                            "img": "Picasso 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 1",
                            "img": "Rosales 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 2",
                            "img": "Rosales 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 3",
                            "img": "Rosales 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Siena",
                            "img": "Siena.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Textil Plata",
                            "img": "Textil Plata.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Verde Nosta",
                            "img": "Verde Nosta.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Woodline 1",
                            "isGrain": true,
                            "img": "Woodline 1.jpg"
                        },
                        {
                            "value": "Woodline 3",
                            "isGrain": true,
                            "img": "Woodline 3.jpg"
                        },
                        {
                            "value": "Woodline 4",
                            "isGrain": true,
                            "img": "Woodline 4.jpg"
                        }
                    ]
                },
                {
                    "value": "Luxe",
                    "img": "luxe.jpg",
                    "colors": [
                        {
                            "value": "Albero HG",
                            "img": "Albero HG.jpg"
                        },
                        {
                            "value": "Arena HG",
                            "img": "Arena HG.jpg"
                        },
                        {
                            "value": "Pompei HG",
                            "img": "Pompei HG.jpg"
                        },
                        {
                            "value": "Siena HG",
                            "img": "Siena HG.jpg"
                        },
                        {
                            "value": "Velazquez 1 HG",
                            "img": "Velazquez 1 HG.jpg"
                        },
                        {
                            "value": "Agua Marina HG",
                            "img": "Agua Marina.jpg"
                        },
                        {
                            "value": "Antracita HG",
                            "img": "Antracita.jpg"
                        },
                        {
                            "value": "Antracita PE",
                            "img": "Antracita Pearl Effect.jpg"
                        },
                        {
                            "value": "Azul Indigo HG",
                            "img": "Azul Indigo.jpg"
                        },
                        {
                            "value": "Azul Marino HG",
                            "img": "Azul Marino.jpg"
                        },
                        {
                            "value": "Basalto HG",
                            "img": "Basalto.jpg"
                        },
                        {
                            "value": "Bernini HG",
                            "img": "Bernini.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Black HG",
                            "img": "Black.jpg"
                        },
                        {
                            "value": "Blanco Colonial PE",
                            "img": "Blanco Colonial Pearl Effect.jpg"
                        },
                        {
                            "value": "Blanco HG",
                            "img": "Supermatt Blanco.jpg"
                        },
                        {
                            "value": "Blanco Polar HG",
                            "img": "Blanco Polar.jpg"
                        },
                        {
                            "value": "Cashmere HG",
                            "img": "Cashmere.jpg"
                        },
                        {
                            "value": "Cuzco Oro HG",
                            "img": "Cuzco Oro.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Euroline 3 HG",
                            "img": "Euroline 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Gris Metallic HG",
                            "img": "Gris Metallic.jpg"
                        },
                        {
                            "value": "Gris Nube HG",
                            "img": "Gris Nube.jpg"
                        },
                        {
                            "value": "Gris Perla HG",
                            "img": "Gris Perla.jpg"
                        },
                        {
                            "value": "Gris Plomo HG",
                            "img": "Gris Plomo.jpg"
                        },
                        {
                            "value": "Guayana HG",
                            "isGrain": true,
                            "img": "Guayana.jpg"
                        },
                        {
                            "value": "Metallo 1 HG",
                            "isGrain": true,
                            "img": "Metallo 1.jpg"
                        },
                        {
                            "value": "Metallo 4 HG",
                            "isGrain": true,
                            "img": "Metallo 4.jpg"
                        },
                        {
                            "value": "Nuvola 3 HG",
                            "img": "Nuvola 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Olivo HG",
                            "isGrain": true,
                            "img": "Olivo.jpg"
                        },
                        {
                            "value": "Olmo HG",
                            "isGrain": true,
                            "img": "Olmo.jpg"
                        },
                        {
                            "value": "Picasso 1 HG",
                            "img": "Picasso 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Porcelain 1 HG",
                            "img": "Porcelain 1.jpg"
                        },
                        {
                            "value": "Rosales 3 HG",
                            "isGrain": true,
                            "img": "Rosales 3.jpg"
                        },
                        {
                            "value": "Textil Plata HG",
                            "img": "Textil Plata.jpg"
                        }
                    ]
                },
                {
                    "value": "Ultrapan PET",
                    "img": "ultrapan.jpg",
                    "colors": [
                        {
                            "value": "Amalfi Noce Gloss",
                            "img": "Ultrapan_PET/Amalfi Noce Gloss.jpg"
                        },
                        {
                            "value": "Amalfi Noce Matte",
                            "img": "Ultrapan_PET/Amalfi Noce Matte.jpg"
                        },
                        {
                            "value": "Black Gloss",
                            "img": "Ultrapan_PET/Black Gloss.jpg"
                        },
                        {
                            "value": "Black Matte",
                            "img": "Ultrapan_PET/Black Matte.jpg"
                        },
                        {
                            "value": "Bright White Gloss",
                            "img": "Ultrapan_PET/Bright White Gloss.jpg"
                        },
                        {
                            "value": "Bright White Matte",
                            "img": "Ultrapan_PET/Bright White Matte.jpg"
                        },
                        {
                            "value": "Canvas Gloss",
                            "img": "Ultrapan_PET/Canvas Gloss.jpg"
                        },
                        {
                            "value": "Chino Gloss",
                            "img": "Ultrapan_PET/Chino Gloss.jpg"
                        },
                        {
                            "value": "Citadel Gloss",
                            "img": "Ultrapan_PET/Citadel Gloss.jpg"
                        },
                        {
                            "value": "Citadel Matte",
                            "img": "Ultrapan_PET/Citadel Matte.jpg"
                        },
                        {
                            "value": "Flint Gloss",
                            "img": "Ultrapan_PET/Flint Gloss.jpg"
                        },
                        {
                            "value": "Flint Matte",
                            "img": "Ultrapan_PET/Flint Matte.jpg"
                        },
                        {
                            "value": "Greystone Gloss",
                            "img": "Ultrapan_PET/Greystone Gloss.jpg"
                        },
                        {
                            "value": "Greystone Matte",
                            "img": "Ultrapan_PET/Greystone Matte.jpg"
                        },
                        {
                            "value": "Honey Mustard Matte",
                            "img": "Ultrapan_PET/Honey Mustard Matte.jpg"
                        },
                        {
                            "value": "Ivory Gloss",
                            "img": "Ultrapan_PET/Ivory Gloss.jpg"
                        },
                        {
                            "value": "Ivory Matte",
                            "img": "Ultrapan_PET/Ivory Matte.jpg"
                        },
                        {
                            "value": "Jade Green Matte",
                            "img": "Ultrapan_PET/Jade Green Matte.jpg"
                        },
                        {
                            "value": "London Fog Matte",
                            "img": "Ultrapan_PET/London Fog Matte.jpg"
                        },
                        {
                            "value": "Merlot Matte",
                            "img": "Ultrapan_PET/Merlot Matte.jpg"
                        },
                        {
                            "value": "Metallic Elm Gloss",
                            "img": "Ultrapan_PET/Metallic Elm Gloss.jpg"
                        },
                        {
                            "value": "Metallic Elm Matte",
                            "img": "Ultrapan_PET/Metallic Elm Matte.jpg"
                        },
                        {
                            "value": "Outer Space Gloss",
                            "img": "Ultrapan_PET/Outer Space Gloss.jpg"
                        },
                        {
                            "value": "Outer Space Matte",
                            "img": "Ultrapan_PET/Outer Space Matte.jpg"
                        },
                        {
                            "value": "Rainstorm Matte",
                            "img": "Ultrapan_PET/Rainstorm Matte.jpg"
                        },
                        {
                            "value": "Red Gloss",
                            "img": "Ultrapan_PET/Red Gloss.jpg"
                        },
                        {
                            "value": "Sheer Linen Gloss",
                            "img": "Ultrapan_PET/Sheer Linen Gloss.jpg"
                        },
                        {
                            "value": "Slate Grey Gloss",
                            "img": "Ultrapan_PET/Slate Grey Gloss.jpg"
                        },
                        {
                            "value": "Slate Grey Matte",
                            "img": "Ultrapan_PET/Slate Grey Matte.jpg"
                        },
                        {
                            "value": "Toffe Gloss",
                            "img": "Ultrapan_PET/Toffe Gloss.jpg"
                        },
                        {
                            "value": "Utaupia Gloss",
                            "img": "Ultrapan_PET/Utaupia Gloss.jpg"
                        },
                        {
                            "value": "Utaupia Matte",
                            "img": "Ultrapan_PET/Utaupia Matte.jpg"
                        },
                        {
                            "value": "White Gloss",
                            "img": "Ultrapan_PET/White Gloss.jpg"
                        },
                        {
                            "value": "White Matte",
                            "img": "Ultrapan_PET/White Matte.jpg"
                        },
                        {
                            "value": "Daybreak Pearl Gloss",
                            "img": "Ultrapan_PET/Daybreak Pearl Gloss.jpg"
                        },
                        {
                            "value": "Lunar Surface Gloss",
                            "img": "Ultrapan_PET/Lunar Surface Gloss.jpg"
                        },
                        {
                            "value": "Midnight Pearl Gloss",
                            "img": "Ultrapan_PET/Midnight Pearl Gloss.jpg"
                        },
                        {
                            "value": "Starfire Pearl Gloss",
                            "img": "Ultrapan_PET/Starfire Pearl Gloss.jpg"
                        },
                        {
                            "value": "Twilight Pearl Gloss",
                            "img": "Ultrapan_PET/Twilight Pearl Gloss.jpg"
                        },
                        {
                            "value": "Arizona SoftTouch",
                            "img": "Ultrapan_PET/Arizona SoftTouch.jpg"
                        },
                        {
                            "value": "Cashmere SoftTouch",
                            "img": "Ultrapan_PET/Cashmere SoftTouch.jpg"
                        },
                        {
                            "value": "Harbor Mist SoftTouch",
                            "img": "Ultrapan_PET/Harbor Mist SoftTouch.jpg"
                        },
                        {
                            "value": "Intercoastal SoftTouch",
                            "img": "Ultrapan_PET/Intercoastal SoftTouch.jpg"
                        },
                        {
                            "value": "Mint SoftTouch",
                            "img": "Ultrapan_PET/Mint SoftTouch.jpg"
                        },
                        {
                            "value": "Nautical Blue SoftTouch",
                            "img": "Ultrapan_PET/Nautical Blue SoftTouch.jpg"
                        },
                        {
                            "value": "Oceanside SoftTouch",
                            "img": "Ultrapan_PET/Oceanside SoftTouch.jpg"
                        },
                        {
                            "value": "Platinum SoftTouch",
                            "img": "Ultrapan_PET/Platinum SoftTouch.jpg"
                        },
                        {
                            "value": "Stone SoftTouch",
                            "img": "Ultrapan_PET/Stone SoftTouch.jpg"
                        },
                        {
                            "value": "Timberline SoftTouch",
                            "img": "Ultrapan_PET/Timberline SoftTouch.jpg"
                        },
                        {
                            "value": "Volcanic Rock SoftTouch",
                            "img": "Ultrapan_PET/Volcanic Rock SoftTouch.jpg"
                        },
                        {
                            "value": "Zinfandel SoftTouch",
                            "img": "Ultrapan_PET/Zinfandel SoftTouch.jpg"
                        },
                        {
                            "value": "Quiet Concrete",
                            "img": "Ultrapan_PET/Quiet Concrete.jpg"
                        },
                        {
                            "value": "Quiet Grain",
                            "img": "Ultrapan_PET/Quiet Grain.jpg"
                        },
                        {
                            "value": "Quiet Leather",
                            "img": "Ultrapan_PET/Quiet Leather.jpg"
                        },
                        {
                            "value": "Quiet Rock",
                            "img": "Ultrapan_PET/Quiet Rock.jpg"
                        },
                        {
                            "value": "Quiet Stone",
                            "img": "Ultrapan_PET/Quiet Stone.jpg"
                        },
                        {
                            "value": "Quiet Wood",
                            "img": "Ultrapan_PET/Quiet Wood.jpg"
                        },
                        {
                            "value": "Willow Concrete",
                            "img": "Ultrapan_PET/Willow Concrete.jpg"
                        },
                        {
                            "value": "Willow Grain",
                            "img": "Ultrapan_PET/Willow Grain.jpg"
                        },
                        {
                            "value": "Willow Leather",
                            "img": "Ultrapan_PET/Willow Leather.jpg"
                        },
                        {
                            "value": "Willow Rock",
                            "img": "Ultrapan_PET/Willow Rock.jpg"
                        },
                        {
                            "value": "Willow Stone",
                            "img": "Ultrapan_PET/Willow Stone.jpg"
                        },
                        {
                            "value": "Willow Wood",
                            "img": "Ultrapan_PET/Willow Wood.jpg"
                        },
                    ]
                },
                {
                    "value": "Zenit",
                    "img": "zenit.jpg",
                    "colors": [
                        {
                            "value": "Alba White SM",
                            "img": "Alba White SM.jpg"
                        },
                        {
                            "value": "Albero SM",
                            "img": "Albero SM.jpg"
                        },
                        {
                            "value": "Arena SM",
                            "img": "Arena SM.jpg"
                        },
                        {
                            "value": "Coral SM",
                            "img": "Coral SM.jpg"
                        },
                        {
                            "value": "MetalPlus Champagne",
                            "img": "MetalPlus Champagne.jpg"
                        },
                        {
                            "value": "Pompei SM",
                            "img": "Pompei SM.jpg"
                        },
                        {
                            "value": "Taupe SM",
                            "img": "Taupe SM.jpg"
                        },
                        {
                            "value": "Agave SM",
                            "img": "Agave.jpg"
                        },
                        {
                            "value": "Agua Marina SM",
                            "img": "Supermatt Agua Marina.jpg"
                        },
                        {
                            "value": "Antracita SM",
                            "img": "Supermatt Antracita.jpg"
                        },
                        {
                            "value": "Azul Índigo SM",
                            "img": "Supermatt Azul Índigo.jpg"
                        },
                        {
                            "value": "Azul Marino SM",
                            "img": "SuperMatt Azul Marino.jpg"
                        },
                        {
                            "value": "Basalto SM",
                            "img": "Supermatt Basalto.jpg"
                        },
                        {
                            "value": "Black SM",
                            "img": "Supermatt Black.jpg"
                        },
                        {
                            "value": "Blanco Polar SM",
                            "img": "Supermatt Blanco Polar.jpg"
                        },
                        {
                            "value": "Blanco SM",
                            "img": "Supermatt Blanco.jpg"
                        },
                        {
                            "value": "Cashmere SM",
                            "img": "Supermatt Cashmere.jpg"
                        },
                        {
                            "value": "Gris Nube SM",
                            "img": "Supermatt Gris Nube.jpg"
                        },
                        {
                            "value": "Gris Perla SM",
                            "img": "Supermatt Gris Perla.jpg"
                        },
                        {
                            "value": "Gris Plomo SM",
                            "img": "Supermatt Gris Plomo.jpg"
                        },
                        {
                            "value": "Nuvola 3 SM",
                            "img": "Nuvola 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Titán 1 SM",
                            "isGrain": true,
                            "img": "Supermatt Titán 1.jpg"
                        },
                        {
                            "value": "Verde Salvia SM",
                            "img": "SuperMatt Verde Salvia.jpg"
                        },
                        {
                            "value": "MetalDeco Black SM",
                            "img": "MetalDeco Black SM.jpg"
                        },
                        {
                            "value": "MetalDeco Blanco SM",
                            "img": "MetalDeco Blanco SM.jpg"
                        },
                        {
                            "value": "MetalPlus Light Gold",
                            "img": "Metal Plus Light Gold.jpg"
                        },
                        {
                            "value": "MetalPlus Titanio SM",
                            "img": "Metal Plus Titanio SM.jpg"
                        }
                    ]
                },
                {
                    "value": "Ultrapan Acrylic",
                    "img": "ultrapan.jpg",
                    colors: [
                        {
                            "value": "Arctic White Gloss",
                            "img": "Ultrapan_Acrylic/Arctic White Gloss.jpg"
                        },
                        {
                            "value": "Arctic White Matte",
                            "img": "Ultrapan_Acrylic/Arctic White Matte.jpg"
                        },
                        {
                            "value": "Comfort Grey Gloss",
                            "img": "Ultrapan_Acrylic/Comfort Grey Gloss.jpg"
                        },
                        {
                            "value": "Comfort Grey Matte",
                            "img": "Ultrapan_Acrylic/Comfort Grey Matte.jpg"
                        },
                        {
                            "value": "Eclipse Grey Gloss",
                            "img": "Ultrapan_Acrylic/Eclipse Grey Gloss.jpg"
                        },
                        {
                            "value": "Galactic Grey Gloss",
                            "img": "Ultrapan_Acrylic/Galactic Grey Gloss.jpg"
                        },
                        {
                            "value": "Galactic Grey Matte",
                            "img": "Ultrapan_Acrylic/Galactic Grey Matte.jpg"
                        },
                        {
                            "value": "Hot Rod Red Gloss",
                            "img": "Ultrapan_Acrylic/Hot Rod Red Gloss.jpg"
                        },
                        {
                            "value": "Jet Black Gloss",
                            "img": "Ultrapan_Acrylic/Jet Black Gloss.jpg"
                        },
                        {
                            "value": "Jet Black Matte",
                            "img": "Ultrapan_Acrylic/Jet Black Matte.jpg"
                        },
                        {
                            "value": "Pebble Gloss",
                            "img": "Ultrapan_Acrylic/Pebble Gloss.jpg"
                        },
                        {
                            "value": "Pebble Matte",
                            "img": "Ultrapan_Acrylic/Pebble Matte.jpg"
                        },
                        {
                            "value": "Polar White Gloss",
                            "img": "Ultrapan_Acrylic/Polar White Gloss.jpg"
                        },
                        {
                            "value": "Polar White Matte",
                            "img": "Ultrapan_Acrylic/Polar White Matte.jpg"
                        },
                        {
                            "value": "Royal Blue Gloss",
                            "img": "Ultrapan_Acrylic/Royal Blue Gloss.jpg"
                        },
                        {
                            "value": "Seal Grey Gloss",
                            "img": "Ultrapan_Acrylic/Seal Grey Gloss.jpg"
                        },
                        {
                            "value": "Seal Grey Matte",
                            "img": "Ultrapan_Acrylic/Seal Grey Matte.jpg"
                        },
                        {
                            "value": "Black Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Black Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Champagne Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Champagne Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Champagne Mettalic Matte",
                            "img": "Ultrapan_Acrylic/Champagne Mettalic Matte.jpg"
                        },
                        {
                            "value": "Dark Grey Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Dark Grey Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Dark Grey Mettalic Matte",
                            "img": "Ultrapan_Acrylic/Dark Grey Mettalic Matte.jpg"
                        },
                        {
                            "value": "Diamond Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Diamond Metallic Gloss.jpg"
                        },
                        {
                            "value": "Frost White Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Frost White Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Obsidian Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Obsidian Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Silver Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Silver Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Silver Mettalic Matte",
                            "img": "Ultrapan_Acrylic/Silver Mettalic Matte.jpg"
                        },
                        {
                            "value": "Titanium Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Titanium Mettalic Gloss.jpg"
                        },
                    ]
                },
                {
                    "value": "OneSkin",
                    "img": "oneSkin.jpg",
                    "colors": [
                        {
                            "value": "Black HG",
                            "img": "oneSkin/Black HG.jpg"
                        },
                        {
                            "value": "Black Oak HG",
                            "img": "oneSkin/Black Oak HG.jpg"
                        },
                        {
                            "value": "Black Oak SM",
                            "img": "oneSkin/Black Oak SM.jpg"
                        },
                        {
                            "value": "Black SM",
                            "img": "oneSkin/Black SM.jpg"
                        },
                        {
                            "value": "Carbon Oak HG",
                            "img": "oneSkin/Carbon Oak HG.jpg"
                        },
                        {
                            "value": "Carbon Oak SM",
                            "img": "oneSkin/Carbon Oak SM.jpg"
                        },
                        {
                            "value": "Cashmere HG",
                            "img": "oneSkin/Cashmere HG.jpg"
                        },
                        {
                            "value": "Cashmere SM",
                            "img": "oneSkin/Cashmere SM.jpg"
                        },
                        {
                            "value": "Denim Blue HG",
                            "img": "oneSkin/Denim Blue HG.jpg"
                        },
                        {
                            "value": "Denim Blue SM",
                            "img": "oneSkin/Denim Blue SM.jpg"
                        },
                        {
                            "value": "Fossil Oak HG",
                            "img": "oneSkin/Fossil Oak HG.jpg"
                        },
                        {
                            "value": "Fossil Oak SM",
                            "img": "oneSkin/Fossil Oak SM.jpg"
                        },
                        {
                            "value": "Grey HG",
                            "img": "oneSkin/Grey HG.jpg"
                        },
                        {
                            "value": "Grey SM",
                            "img": "oneSkin/Grey SM.jpg"
                        },
                        {
                            "value": "Lava Grey HG",
                            "img": "oneSkin/Lava Grey HG.jpg"
                        },
                        {
                            "value": "Lava Grey SM",
                            "img": "oneSkin/Lava Grey SM.jpg"
                        },
                        {
                            "value": "Light Grey HG",
                            "img": "oneSkin/Light Grey HG.jpg"
                        },
                        {
                            "value": "Light Grey SM",
                            "img": "oneSkin/Light Grey SM.jpg"
                        },
                        {
                            "value": "Light Walnut HG",
                            "img": "oneSkin/Light Walnut HG.jpg"
                        },
                        {
                            "value": "Light Walnut SM",
                            "img": "oneSkin/Light Walnut SM.jpg"
                        },
                        {
                            "value": "Natural Cement HG",
                            "img": "oneSkin/Natural Cement HG.jpg"
                        },
                        {
                            "value": "Natural Cement SM",
                            "img": "oneSkin/Natural Cement SM.jpg"
                        },
                        {
                            "value": "Natural Oak HG",
                            "img": "oneSkin/Natural Oak HG.jpg"
                        },
                        {
                            "value": "Natural Oak SM",
                            "img": "oneSkin/Natural Oak SM.jpg"
                        },
                        {
                            "value": "Old Oak HG",
                            "img": "oneSkin/Old Oak HG.jpg"
                        },
                        {
                            "value": "Old Oak SM",
                            "img": "oneSkin/Old Oak SM.jpg"
                        },
                        {
                            "value": "Smoked Elm HG",
                            "img": "oneSkin/Smoked Elm HG.jpg"
                        },
                        {
                            "value": "Smoked Elm SM",
                            "img": "oneSkin/Smoked Elm SM.jpg"
                        },
                        {
                            "value": "Sunny White HG",
                            "img": "oneSkin/Sunny White HG.jpg"
                        },
                        {
                            "value": "Sunny White SM",
                            "img": "oneSkin/Sunny White SM.jpg"
                        },
                        {
                            "value": "Torino Oak 2 HG",
                            "img": "oneSkin/Torino Oak 2 HG.jpg"
                        },
                        {
                            "value": "Torino Oak 2 SM",
                            "img": "oneSkin/Torino Oak 2 SM.jpg"
                        },
                        {
                            "value": "Tortora HG",
                            "img": "oneSkin/Tortora HG.jpg"
                        },
                        {
                            "value": "Tortora SM",
                            "img": "oneSkin/Tortora SM.jpg"
                        },
                        {
                            "value": "White Elm HG",
                            "img": "oneSkin/White Elm HG.jpg"
                        },
                        {
                            "value": "White Elm SM",
                            "img": "oneSkin/White Elm SM.jpg"
                        }
                    ]
                },
                {
                    "value": "Wood Veneer",
                    "img": "wood-veneer.jpg",
                    "colors": [
                        {
                            "value": "Desert Oak",
                            "img": "wood-veneer/Desert Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Frozen Walnut",
                            "img": "wood-veneer/Frozen Walnut.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ivory Oak",
                            "img": "wood-veneer/Ivory Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Manhattan Oak",
                            "img": "wood-veneer/Manhattan Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Milk Oak",
                            "img": "wood-veneer/Milk Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Pebble Triba",
                            "img": "wood-veneer/Pebble Triba.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Pure Walnut",
                            "img": "wood-veneer/Pure Walnut.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Smoked Walnut",
                            "img": "wood-veneer/Smoked Walnut.jpg",
                            "isGrain": true
                        }
                    ]
                },
                {
                    "value": "Finsa",
                    "img": "finsa.jpg",
                    "colors": [
                        {
                            "value": "Biscuit 36W",
                            "img": "finsa/Biscuit 36W.jpg"
                        },
                        {
                            "value": "Blackwood 231",
                            "img": "finsa/Blackwood 231.jpg"
                        },
                        {
                            "value": "Blanco Medio 020",
                            "img": "finsa/Blanco Medio 020.jpg"
                        },
                        {
                            "value": "Bohemian Blanco 3AT",
                            "img": "finsa/Bohemian Blanco 3AT.jpg"
                        },
                        {
                            "value": "Cemento 06F",
                            "img": "finsa/Cemento 06F.jpg"
                        },
                        {
                            "value": "Espiga Pimienta 97Q",
                            "img": "finsa/Espiga Pimienta 97Q.jpg"
                        },
                        {
                            "value": "Espiga Sal 98Q",
                            "img": "finsa/Espiga Sal 98Q.jpg"
                        },
                        {
                            "value": "Essenza Oak 631B",
                            "img": "finsa/Essenza Oak 631B.jpg"
                        },
                        {
                            "value": "Fresno Glacial 16N",
                            "img": "finsa/Fresno Glacial 16N.jpg"
                        },
                        {
                            "value": "Gris Coco 15R",
                            "img": "finsa/Gris Coco 15R.jpg"
                        },
                        {
                            "value": "Gris Cuatro 206",
                            "img": "finsa/Gris Cuatro 206.jpg"
                        },
                        {
                            "value": "Gris Gu 71A",
                            "img": "finsa/Gris Gu 71A.jpg"
                        },
                        {
                            "value": "Gris Suave 60V",
                            "img": "finsa/Gris Suave 60V.jpg"
                        },
                        {
                            "value": "Lecer 251B",
                            "img": "finsa/Lecer 251B.jpg"
                        },
                        {
                            "value": "Lino Cancun 12G",
                            "img": "finsa/Lino Cancun 12G.jpg"
                        },
                        {
                            "value": "Lino Esteiro 79G",
                            "img": "finsa/Lino Esteiro 79G.jpg"
                        },
                        {
                            "value": "Lino Nassau 614B",
                            "img": "finsa/Lino Nassau 614B.jpg"
                        },
                        {
                            "value": "Marmol Blanco 72Y",
                            "img": "finsa/Marmol Blanco 72Y.jpg"
                        },
                        {
                            "value": "Marmol Hades 1AT",
                            "img": "finsa/Marmol Hades 1AT.jpg"
                        },
                        {
                            "value": "Mineral Grey 40Y",
                            "img": "finsa/Mineral Grey 40Y.jpg"
                        },
                        {
                            "value": "Natural Grey U12",
                            "img": "finsa/Natural Grey U12.jpg"
                        },
                        {
                            "value": "Nogal Slow 5AE",
                            "img": "finsa/Nogal Slow 5AE.jpg"
                        },
                        {
                            "value": "Olmo Grace 449B",
                            "img": "finsa/Olmo Grace 449B.jpg"
                        },
                        {
                            "value": "Richmond Plum 37E",
                            "img": "finsa/Richmond Plum 37E.jpg"
                        },
                        {
                            "value": "Roble Aurora 98V",
                            "img": "finsa/Roble Aurora 98V.jpg"
                        },
                        {
                            "value": "Roble Azabache 75V",
                            "img": "finsa/Roble Azabache 75V.jpg"
                        },
                        {
                            "value": "Roble Bello 008",
                            "img": "finsa/Roble Bello 008.jpg"
                        },
                        {
                            "value": "Roble Colorado 97V",
                            "img": "finsa/Roble Colorado 97V.jpg"
                        },
                        {
                            "value": "Roble Cooper 452B",
                            "img": "finsa/Roble Cooper 452B.jpg"
                        },
                        {
                            "value": "Roble Denver 84V",
                            "img": "finsa/Roble Denver 84V.jpg"
                        },
                        {
                            "value": "Roble Eternity 4AE",
                            "img": "finsa/Roble Eternity 4AE.jpg"
                        },
                        {
                            "value": "Roble Joplin 17N",
                            "img": "finsa/Roble Joplin 17N.jpg"
                        },
                        {
                            "value": "Roble Newman 451B",
                            "img": "finsa/Roble Newman 451B.jpg"
                        },
                        {
                            "value": "Roble Oasis 3AE",
                            "img": "finsa/Roble Oasis 3AE.jpg"
                        },
                        {
                            "value": "Roble Stella 74V",
                            "img": "finsa/Roble Stella 74V.jpg"
                        },
                        {
                            "value": "Roble Trigo 42B",
                            "img": "finsa/Roble Trigo 42B.jpg"
                        },
                        {
                            "value": "Sostanza Oak 632B",
                            "img": "finsa/Sostanza Oak 632B.jpg"
                        },
                        {
                            "value": "Tasmanian Natural 212B",
                            "img": "finsa/Tasmanian Natural 212B.jpg"
                        },
                        {
                            "value": "Tessuto 70F",
                            "img": "finsa/Tessuto 70F.jpg"
                        },
                        {
                            "value": "White 78E",
                            "img": "finsa/White 78E.jpg"
                        }
                    ]
                },
                {
                    "value": "Egger",
                    "img": "egger.jpg",
                    "colors": [
                        {
                            "value": "F416 Beige Textile",
                            "img": "erger/F416 Beige Textile.jpg"
                        },
                        {
                            "value": "F417 Grey Textile",
                            "img": "erger/F417 Grey Textile.jpg"
                        },
                        {
                            "value": "F422 White Linen",
                            "img": "erger/F422 White Linen.jpg"
                        },
                        {
                            "value": "F433 Anthracite Linen",
                            "img": "erger/F433 Anthracite Linen.jpg"
                        },
                        {
                            "value": "F638 Chromix Silver",
                            "img": "erger/F638 Chromix Silver.jpg"
                        },
                        {
                            "value": "H1180 Natural Halifax Oak",
                            "img": "erger/H1180 Natural Halifax Oak.jpg"
                        },
                        {
                            "value": "H1210 Grey-Beige Tossini Elm",
                            "img": "erger/H1210 Grey-Beige Tossini Elm.jpg"
                        },
                        {
                            "value": "H1222 Fox Grey Tossini Elm",
                            "img": "erger/H1222 Fox Grey Tossini Elm.jpg"
                        },
                        {
                            "value": "H1288 Stone Grey Frozen Wood",
                            "img": "erger/H1288 Stone Grey Frozen Wood.jpg"
                        },
                        {
                            "value": "H1290 White Frozen Wood",
                            "img": "erger/H1290 White Frozen Wood.jpg"
                        },
                        {
                            "value": "H1292 Carbon Frozen Wood",
                            "img": "erger/H1292 Carbon Frozen Wood.jpg"
                        },
                        {
                            "value": "H1367 Light Natural Casella",
                            "img": "erger/H1367 Light Natural Casella.jpg"
                        },
                        {
                            "value": "H1384 White Casella Oak",
                            "img": "erger/H1384 White Casella Oak.jpg"
                        },
                        {
                            "value": "H1701 White Tossini Elm",
                            "img": "erger/H1701 White Tossini Elm.jpg"
                        },
                        {
                            "value": "H1714 Lincoln Walnut",
                            "img": "erger/H1714 Lincoln Walnut.jpg"
                        },
                        {
                            "value": "H1815 Hardrock Maple",
                            "img": "erger/H1815 Hardrock Maple.jpg"
                        },
                        {
                            "value": "H3078 White Havana Pine",
                            "img": "erger/H3078 White Havana Pine.jpg"
                        },
                        {
                            "value": "H3081 Black Havana Pine",
                            "img": "erger/H3081 Black Havana Pine.jpg"
                        },
                        {
                            "value": "H3157 Vicenza Oak",
                            "img": "erger/H3157 Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3158 Grey Vicenza Oak",
                            "img": "erger/H3158 Grey Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3165 Light Vicenza Oak",
                            "img": "erger/H3165 Light Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3171 Oiled Kendal Oak",
                            "img": "erger/H3171 Oiled Kendal Oak.jpg"
                        },
                        {
                            "value": "H3195 White Fineline",
                            "img": "erger/H3195 White Fineline.jpg"
                        },
                        {
                            "value": "H3790 Honey Carini Walnut",
                            "img": "erger/H3790 Honey Carini Walnut.jpg"
                        },
                        {
                            "value": "H3791 Carini Auburn Walnut",
                            "img": "erger/H3791 Carini Auburn Walnut.jpg"
                        },
                        {
                            "value": "H3794 Chocolate Carini Walnut",
                            "img": "erger/H3794 Chocolate Carini Walnut.jpg"
                        },
                        {
                            "value": "U201 Pebble Grey",
                            "img": "erger/U201 Pebble Grey.jpg"
                        },
                        {
                            "value": "U502 Misty Blue",
                            "img": "erger/U502 Misty Blue.jpg"
                        },
                        {
                            "value": "U702 Cashmere Grey",
                            "img": "erger/U702 Cashmere Grey.jpg"
                        },
                        {
                            "value": "U705 Angora Grey",
                            "img": "erger/U705 Angora Grey.jpg"
                        },
                        {
                            "value": "U727 Stone Grey",
                            "img": "erger/U727 Stone Grey.jpg"
                        },
                        {
                            "value": "U765 Silver Grey",
                            "img": "erger/U765 Silver Grey.jpg"
                        },
                        {
                            "value": "U779 Fog Grey",
                            "img": "erger/U779 Fog Grey.jpg"
                        },
                        {
                            "value": "U780 Monument Grey",
                            "img": "erger/U780 Monument Grey.jpg"
                        },
                        {
                            "value": "U963 Diamond Grey",
                            "img": "erger/U963 Diamond Grey.jpg"
                        },
                        {
                            "value": "U999 ST7 Black",
                            "img": "erger/U999 ST7 Black.jpg"
                        },
                        {
                            "value": "U999 ST19 Black",
                            "img": "erger/U999 ST19 Black.jpg"
                        },
                        {
                            "value": "W960 Classic White",
                            "img": "erger/W960 Classic White.jpg"
                        },
                        {
                            "value": "W1100 ST9 Alpine White",
                            "img": "erger/W1100 ST9 Alpine White - Copy.jpg"
                        },
                        {
                            "value": "W1100 ST19 Alpine White",
                            "img": "erger/W1100 ST19 Alpine White.jpg"
                        }
                    ]
                },
                {
                    "value": "Cleaf",
                    "img": "cleaf.jpg",
                    "colors": [
                        {
                            "value": "Ares Night UB02",
                            "img": "cleaf/Ares Night UB02.jpg"
                        },
                        {
                            "value": "Cheope Total White BO73",
                            "img": "cleaf/Cheope Total White BO73.jpg"
                        },
                        {
                            "value": "Fronda Bardini S164",
                            "img": "cleaf/Fronda Bardini S164.jpg"
                        },
                        {
                            "value": "Jiometori Naoshima S191",
                            "img": "cleaf/Jiometori Naoshima S191.jpg"
                        },
                        {
                            "value": "Jiometori Teshima S192",
                            "img": "cleaf/Jiometori Teshima S192.jpg"
                        },
                        {
                            "value": "Matrix Bianco BO11",
                            "img": "cleaf/Matrix Bianco BO11.jpg"
                        },
                        {
                            "value": "Matrix Carbone LM08",
                            "img": "cleaf/Matrix Carbone LM08.jpg"
                        },
                        {
                            "value": "Matrix Vineyard Oak LN30",
                            "img": "cleaf/Matrix Vineyard Oak LN30.jpg"
                        },
                        {
                            "value": "Okobo Meguro S160",
                            "img": "cleaf/Okobo Meguro S160.jpg"
                        },
                        {
                            "value": "Okobo Nakano S162",
                            "img": "cleaf/Okobo Nakano S162.jpg"
                        },
                        {
                            "value": "Poro Noce Acerno LS14",
                            "img": "cleaf/Poro Noce Acerno LS14.jpg"
                        },
                        {
                            "value": "Poro Noce Giffoni LS13",
                            "img": "cleaf/Poro Noce Giffoni LS13.jpg"
                        },
                        {
                            "value": "Primofiore Bianco BO11",
                            "img": "cleaf/Primofiore Bianco BO11.jpg"
                        },
                        {
                            "value": "Primofiore Maya Bronze FA33",
                            "img": "cleaf/Primofiore Maya Bronze FA33.jpg"
                        },
                        {
                            "value": "Sable Ascari LR25",
                            "img": "cleaf/Sable Ascari LR25.jpg"
                        },
                        {
                            "value": "Sherwood Brolio Oak LR09",
                            "img": "cleaf/Sherwood Brolio Oak LR09.jpg"
                        },
                        {
                            "value": "Sherwood Gavi Oak LN66",
                            "img": "cleaf/Sherwood Gavi Oak LN66.jpg"
                        },
                        {
                            "value": "Sherwood Toasted Espresso SO71",
                            "img": "cleaf/Sherwood Toasted Espresso SO71.jpg"
                        },
                        {
                            "value": "Yosemite Cypress Point SO13",
                            "img": "cleaf/Yosemite Cypress Point SO13.jpg"
                        }
                    ]
                },
                {
                    "value": "StyleLite",
                    "img": "StyleLite.jpg",
                    "colors": [
                        {
                            "value": "Alabaster Gloss",
                            "img": "styleLite/Alabaster.jpg"
                        },
                        {
                            "value": "Alabaster Matte",
                            "img": "styleLite/Alabaster.jpg"
                        },
                        {
                            "value": "Arctic Gloss",
                            "img": "styleLite/Arctic.jpg"
                        },
                        {
                            "value": "Arctic Matte",
                            "img": "styleLite/Arctic.jpg"
                        },
                        {
                            "value": "Ash Gloss",
                            "img": "styleLite/Ash.jpg"
                        },
                        {
                            "value": "Ash Matte",
                            "img": "styleLite/Ash.jpg"
                        },
                        {
                            "value": "Atlantic Gloss",
                            "img": "styleLite/Atlantic.jpg"
                        },
                        {
                            "value": "Braun Matte",
                            "img": "styleLite/Buran.jpg"
                        },
                        {
                            "value": "Brilliant Pearl Gloss",
                            "img": "styleLite/Brilliant-Pearl.jpg"
                        },
                        {
                            "value": "Calacatta Marble Gloss",
                            "img": "styleLite/Calacatta.jpg"
                        },
                        {
                            "value": "Calacatta Marble Velvet",
                            "img": "styleLite/Calacatta.jpg"
                        },
                        {
                            "value": "Carbon Gloss",
                            "img": "styleLite/Carbon.jpg"
                        },
                        {
                            "value": "Carbon Matte",
                            "img": "styleLite/Carbon.jpg"
                        },
                        {
                            "value": "Champagne Gloss",
                            "img": "styleLite/Champagne.jpg"
                        },
                        {
                            "value": "Charcoal Gloss",
                            "img": "styleLite/Charcoal.jpg"
                        },
                        {
                            "value": "Charcoal Matte",
                            "img": "styleLite/Charcoal.jpg"
                        },
                        {
                            "value": "Dove Gloss",
                            "img": "styleLite/Dove.jpg"
                        },
                        {
                            "value": "Dove Matte",
                            "img": "styleLite/Dove.jpg"
                        },
                        {
                            "value": "Graphite Gloss",
                            "img": "styleLite/Graphite.jpg"
                        },
                        {
                            "value": "Graphite Matte",
                            "img": "styleLite/Graphite.jpg"
                        },
                        {
                            "value": "Jura Matte",
                            "img": "styleLite/Jura.jpg"
                        },
                        {
                            "value": "Lavato-Oak Gloss",
                            "img": "styleLite/Lavato-Oak.jpg"
                        },
                        {
                            "value": "Lavato-Oak Velvet",
                            "img": "styleLite/Lavato-Oak.jpg"
                        },
                        {
                            "value": "Misty Mirra Gloss",
                            "img": "styleLite/Misty-Mirra.jpg"
                        },
                        {
                            "value": "Mocha Gloss",
                            "img": "styleLite/Mocha.jpg"
                        },
                        {
                            "value": "Mountain Matte",
                            "img": "styleLite/mountain.jpg"
                        },
                        {
                            "value": "Oceanic Matte",
                            "img": "styleLite/oceanic.jpg"
                        },
                        {
                            "value": "Pewter Gloss",
                            "img": "styleLite/Pewter.jpg"
                        },
                        {
                            "value": "Rainforest Matte",
                            "img": "styleLite/rainforest.jpg"
                        },
                        {
                            "value": "Riga-Birch Gloss",
                            "img": "styleLite/Riga-Birch.jpg"
                        },
                        {
                            "value": "Riga-Birch Velvet",
                            "img": "styleLite/Riga-Birch.jpg"
                        },
                        {
                            "value": "Ruby Gloss",
                            "img": "styleLite/Ruby.jpg"
                        },
                        {
                            "value": "Sand Gloss",
                            "img": "styleLite/Sand.jpg"
                        },
                        {
                            "value": "Shell Matte",
                            "img": "styleLite/shell.jpg"
                        },
                        {
                            "value": "Sienna-Teak Gloss",
                            "img": "styleLite/Sienna-Teak.jpg"
                        },
                        {
                            "value": "Sienna-Teak Velvet",
                            "img": "styleLite/Sienna-Teak.jpg"
                        },
                        {
                            "value": "Silver Gloss",
                            "img": "styleLite/Silver.jpg"
                        },
                        {
                            "value": "Slate Gloss",
                            "img": "styleLite/Slate.jpg"
                        },
                        {
                            "value": "Slate Matte",
                            "img": "styleLite/Slate.jpg"
                        },
                        {
                            "value": "Tierra Elm Gloss",
                            "img": "styleLite/Tierra-Elm.jpg"
                        },
                        {
                            "value": "Tierra Elm Velvet",
                            "img": "styleLite/Tierra-Elm.jpg"
                        },
                        {
                            "value": "Titanium Gloss",
                            "img": "styleLite/Titanium.jpg"
                        },
                        {
                            "value": "Travertine Crosscut Velvet",
                            "img": "styleLite/Travertine-Crosscut.jpg"
                        },
                        {
                            "value": "Travertine Veincut Velvet",
                            "img": "styleLite/Travertine-Veincut.jpg"
                        },
                        {
                            "value": "Vintage Mira Gloss",
                            "img": "styleLite/Vintage-Mira.jpg"
                        },
                        {
                            "value": "Wired Mercury Gloss",
                            "img": "styleLite/Wired-Mercury.jpg"
                        },
                        {
                            "value": "Wired Mercury Velvet",
                            "img": "styleLite/Wired-Mercury.jpg"
                        },
                        {
                            "value": "Wired Zinc Gloss",
                            "img": "styleLite/Wired-Zinc.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "value": "Three Piece Door",
            "img": "Doors 3pc.jpg",
            "is_hide": true,
            "finish": [
                {
                    "value": "Syncron",
                    "img": "syncron.jpg",
                    "colors": [
                        {
                            "value": "Alhambra 1",
                            "img": "Alhambra 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Alhambra 2",
                            "img": "Alhambra 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Alhambra 3",
                            "img": "Alhambra 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Black Minerva",
                            "img": "Black Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Cashmere Minerva",
                            "img": "Cashmere Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Black",
                            "img": "Reeded Black.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Blanco",
                            "img": "Reeded Blanco.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Cashmere",
                            "img": "Reeded Cashmere.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 4",
                            "img": "Rosales 4.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 1",
                            "img": "Velazquez 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 2",
                            "img": "Velazquez 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 5",
                            "img": "Velazquez 5.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "White Minerva",
                            "img": "White Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Anniversary Oak 2",
                            "img": "Anniversary Oak 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Bernini",
                            "img": "Bernini.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brushed Concrete 1",
                            "img": "Brushed Concrete 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brushed Concrete 2",
                            "img": "Brushed Concrete 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Como Ash 1",
                            "isGrain": true,
                            "img": "Como Ash 1.jpg"
                        },
                        {
                            "value": "Como Ash 2",
                            "isGrain": true,
                            "img": "Como Ash 2.jpg"
                        },
                        {
                            "value": "Como Ash 3",
                            "isGrain": true,
                            "img": "Como Ash 3.jpg"
                        },
                        {
                            "value": "Evora 4",
                            "isGrain": true,
                            "img": "Evora 4.jpg"
                        },
                        {
                            "value": "Frappe 1",
                            "img": "Frappé 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Frappe 3",
                            "img": "Frappé 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ice 1",
                            "isGrain": true,
                            "img": "Ice 1.jpg"
                        },
                        {
                            "value": "Ida 1",
                            "isGrain": true,
                            "img": "Ida 1.jpg"
                        },
                        {
                            "value": "Ida 2",
                            "isGrain": true,
                            "img": "Ida 2.jpg"
                        },
                        {
                            "value": "Ida 3",
                            "isGrain": true,
                            "img": "Ida 3.jpg"
                        },
                        {
                            "value": "Lakeland Oak 3",
                            "isGrain": true,
                            "img": "Lakeland Oak 3.jpg"
                        },
                        {
                            "value": "Muratti 1",
                            "isGrain": true,
                            "img": "Muratti 1.jpg"
                        },
                        {
                            "value": "Muratti 2",
                            "isGrain": true,
                            "img": "Muratti 2.jpg"
                        },
                        {
                            "value": "Muratti 3",
                            "isGrain": true,
                            "img": "Muratti 3.jpg"
                        },
                        {
                            "value": "Muratti 4",
                            "isGrain": true,
                            "img": "Muratti 4.jpg"
                        },
                        {
                            "value": "Nocce 1",
                            "isGrain": true,
                            "img": "Nocce 1.jpg"
                        },
                        {
                            "value": "Nocce 3",
                            "isGrain": true,
                            "img": "Nocce 3.jpg"
                        },
                        {
                            "value": "Olmo 3",
                            "isGrain": true,
                            "img": "Olmo 3.jpg"
                        },
                        {
                            "value": "Picasso 1",
                            "img": "Picasso 1.jpg"
                        },
                        {
                            "value": "Picasso 2",
                            "img": "Picasso 2.jpg"
                        },
                        {
                            "value": "Picasso 3",
                            "img": "Picasso 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 1",
                            "img": "Rosales 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 2",
                            "img": "Rosales 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 3",
                            "img": "Rosales 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Siena",
                            "img": "Siena.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Textil Plata",
                            "img": "Textil Plata.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Verde Nosta",
                            "img": "Verde Nosta.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Woodline 1",
                            "isGrain": true,
                            "img": "Woodline 1.jpg"
                        },
                        {
                            "value": "Woodline 3",
                            "isGrain": true,
                            "img": "Woodline 3.jpg"
                        },
                        {
                            "value": "Woodline 4",
                            "isGrain": true,
                            "img": "Woodline 4.jpg"
                        }
                    ]
                },
                {
                    "value": "Luxe",
                    "img": "luxe.jpg",
                    "colors": [
                        {
                            "value": "Albero HG",
                            "img": "Albero HG.jpg"
                        },
                        {
                            "value": "Arena HG",
                            "img": "Arena HG.jpg"
                        },
                        {
                            "value": "Pompei HG",
                            "img": "Pompei HG.jpg"
                        },
                        {
                            "value": "Siena HG",
                            "img": "Siena HG.jpg"
                        },
                        {
                            "value": "Velazquez 1 HG",
                            "img": "Velazquez 1 HG.jpg"
                        },
                        {
                            "value": "Agua Marina HG",
                            "img": "Agua Marina.jpg"
                        },
                        {
                            "value": "Antracita HG",
                            "img": "Antracita.jpg"
                        },
                        {
                            "value": "Antracita PE",
                            "img": "Antracita Pearl Effect.jpg"
                        },
                        {
                            "value": "Azul Indigo HG",
                            "img": "Azul Indigo.jpg"
                        },
                        {
                            "value": "Azul Marino HG",
                            "img": "Azul Marino.jpg"
                        },
                        {
                            "value": "Basalto HG",
                            "img": "Basalto.jpg"
                        },
                        {
                            "value": "Bernini HG",
                            "img": "Bernini.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Black HG",
                            "img": "Black.jpg"
                        },
                        {
                            "value": "Blanco Colonial PE",
                            "img": "Blanco Colonial Pearl Effect.jpg"
                        },
                        {
                            "value": "Blanco HG",
                            "img": "Supermatt Blanco.jpg"
                        },
                        {
                            "value": "Blanco Polar HG",
                            "img": "Blanco Polar.jpg"
                        },
                        {
                            "value": "Cashmere HG",
                            "img": "Cashmere.jpg"
                        },
                        {
                            "value": "Cuzco Oro HG",
                            "isGrain": true,
                            "img": "Cuzco Oro.jpg"
                        },
                        {
                            "value": "Euroline 3 HG",
                            "isGrain": true,
                            "img": "Euroline 3.jpg"
                        },
                        {
                            "value": "Gris Metallic HG",
                            "img": "Gris Metallic.jpg"
                        },
                        {
                            "value": "Gris Nube HG",
                            "img": "Gris Nube.jpg"
                        },
                        {
                            "value": "Gris Perla HG",
                            "img": "Gris Perla.jpg"
                        },
                        {
                            "value": "Gris Plomo HG",
                            "img": "Gris Plomo.jpg"
                        },
                        {
                            "value": "Guayana HG",
                            "isGrain": true,
                            "img": "Guayana.jpg"
                        },
                        {
                            "value": "Metallo 1 HG",
                            "isGrain": true,
                            "img": "Metallo 1.jpg"
                        },
                        {
                            "value": "Metallo 4 HG",
                            "isGrain": true,
                            "img": "Metallo 4.jpg"
                        },
                        {
                            "value": "Nuvola 3 HG",
                            "img": "Nuvola 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Olivo HG",
                            "isGrain": true,
                            "img": "Olivo.jpg"
                        },
                        {
                            "value": "Olmo HG",
                            "isGrain": true,
                            "img": "Olmo.jpg"
                        },
                        {
                            "value": "Picasso 1 HG",
                            "img": "Picasso 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Porcelain 1 HG",
                            "img": "Porcelain 1.jpg"
                        },
                        {
                            "value": "Rosales 3 HG",
                            "isGrain": true,
                            "img": "Rosales 3.jpg"
                        },
                        {
                            "value": "Textil Plata HG",
                            "img": "Textil Plata.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "value": "Five Piece Shaker",
            "img": "shaker.jpg",
            "is_hide": true,
            "finish": [
                {
                    "value": "Syncron",
                    "img": "syncron.jpg",
                    "colors": [
                        {
                            "value": "Como Ash 2",
                            "isGrain": true,
                            "img": "Como Ash 2.jpg"
                        },
                        {
                            "value": "Rosales 1",
                            "isGrain": true,
                            "img": "Rosales 1.jpg"
                        },
                        {
                            "value": "Rosales 2",
                            "isGrain": true,
                            "img": "Rosales 2.jpg"
                        },
                        {
                            "value": "Rosales 3",
                            "isGrain": true,
                            "img": "Rosales 3.jpg"
                        },
                        {
                            "value": "Nocce 1",
                            "isGrain": true,
                            "img": "Nocce 1.jpg"
                        },
                        {
                            "value": "Muratti 4",
                            "isGrain": true,
                            "img": "Muratti 4.jpg"
                        },
                        {
                            "value": "Woodline 3",
                            "isGrain": true,
                            "img": "Woodline 3.jpg"
                        }
                    ]
                },
                {
                    "value": "Zenit",
                    "colors": [
                        {
                            "value": "Agave SM",
                            "img": "Agave.jpg"
                        },
                        {
                            "value": "Antracita SM",
                            "img": "Supermatt Antracita.jpg"
                        },
                        {
                            "value": "Blanco SM",
                            "img": "Supermatt Blanco.jpg"
                        },
                        {
                            "value": "Cashmere SM",
                            "img": "Supermatt Cashmere.jpg"
                        }
                    ],
                    "img": "zenit.jpg"
                }
            ]
        },
        {
            "value": "Finger Pull",
            "img": "Finger pull.jpg",
            "is_hide": true,
            "finish": [
                {
                    "value": "Syncron",
                    "img": "syncron.jpg",
                    "colors": [
                        {
                            "value": "Como Ash 2 FP",
                            "img": "fp/Como-Ash-2-Finger-Pull.jpg",
                            "isGrain": 1
                        },
                        {
                            "value": "Muratti 1 FP",
                            "img": "fp/Muratti-1-Finger-Pull.jpg",
                            "isGrain": 1
                        },
                        {
                            "value": "Muratti 4 FP",
                            "img": "fp/Muratti-4-Finger-Pull.jpg",
                            "isGrain": 1
                        },
                        {
                            "value": "Nocce 1 FP",
                            "img": "fp/Nocce-1-Finger-Pull.jpg",
                            "isGrain": 1
                        },
                        {
                            "value": "Nocce 3 FP",
                            "img": "fp/Nocce-3-Finger-Pull.jpg",
                            "isGrain": 1
                        },
                        {
                            "value": "Rosales 2 FP",
                            "img": "fp/Rosales-2-Finger-Pull.jpg",
                            "isGrain": 1
                        },
                        {
                            "value": "Rosales 3 FP",
                            "img": "fp/Rosales-3-Finger-Pull.jpg",
                            "isGrain": 1
                        },
                        {
                            "value": "Woodline 3 FP",
                            "img": "fp/Woodline-3-Finger-Pull.jpg",
                            "isGrain": 1
                        }
                    ]
                },
                {
                    "value": "Luxe",
                    "img": "luxe.jpg",
                    "colors": [
                        {
                            "value": "Blanco HG FP",
                            "img": "fp/Blanco-Luxe-Finger-Pull.jpg"
                        }
                    ]
                },
                {
                    "value": "Zenit",
                    "img": "zenit.jpg",
                    "colors": [
                        {
                            "value": "Blanco SM FP",
                            "img": "fp/Blanco-Zenit-Finger-Pull.jpg"
                        },
                        {
                            "value": "Cashmere SM FP",
                            "img": "fp/Cashmere-Zenit-Finger-Pull.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "value": "Shaker",
            "img": "Doors MicroShaker.jpg",
            "finish": [
                {
                    "value": "Milino",
                    "img": "milino.jpg",
                    "colors": [
                        {
                            "value": "White Melamine",
                            "img": "White-Melamine.jpg"
                        },
                        {
                            "value": "Grey Melamine",
                            "img": "Gray-Melamine.jpg"
                        },
                        {
                            "value": "Grey Linen Melamine",
                            "img": "Gray-Linen-Melamine.jpg"
                        },
                        {
                            "value": "Beige Linen Melamine",
                            "img": "Beige-Linen-Melamine.jpg"
                        },
                        {
                            "value": "Ash Melamine",
                            "img": "Ash-Melamine-1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Walnut Melamine",
                            "img": "Walnut-Melamine.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brown Oak",
                            "img": "Brown Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ivory Woodline",
                            "img": "Ivory Woodline.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Sable Wood",
                            "img": "Sable Wood.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Grey Woodline",
                            "img": "Grey Woodline.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "White Oak",
                            "img": "White Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Desert Oak",
                            "img": "Desert Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Glacier Oak",
                            "img": "Glacial_Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ultra Matte White",
                            "img": "Ultra Matte White.jpg"
                        },
                        {
                            "value": "Ultra Matte Grey",
                            "img": "Ultra Matte Grey.jpg"
                        },
                        {
                            "value": "Ultra Matte Cashmere",
                            "img": "Cashmere.jpg"
                        },
                        {
                            "value": "Ultra Matte Gris",
                            "img": "UltraMatte Gris.jpg"
                        },
                        {
                            "value": "Ultra Matte Volcano",
                            "img": "UltraMatte_Volcano.jpg"
                        },
                        {
                            "value": "White Gloss",
                            "img": "White.jpg"
                        }
                    ]
                },
                {
                    "value": "Syncron",
                    "img": "syncron.jpg",
                    "colors": [
                        {
                            "value": "Alhambra 1",
                            "img": "Alhambra 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Alhambra 2",
                            "img": "Alhambra 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Alhambra 3",
                            "img": "Alhambra 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Anniversary Oak 2",
                            "isGrain": true,
                            "img": "Anniversary Oak 2.jpg"
                        },
                        {
                            "value": "Brushed Concrete 1",
                            "img": "Brushed Concrete 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brushed Concrete 2",
                            "img": "Brushed Concrete 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Como Ash 1",
                            "isGrain": true,
                            "img": "Como Ash 1.jpg"
                        },
                        {
                            "value": "Como Ash 2",
                            "isGrain": true,
                            "img": "Como Ash 2.jpg"
                        },
                        {
                            "value": "Como Ash 3",
                            "isGrain": true,
                            "img": "Como Ash 3.jpg"
                        },
                        {
                            "value": "Evora 4",
                            "isGrain": true,
                            "img": "Evora 4.jpg"
                        },
                        {
                            "value": "Frappé 1",
                            "isGrain": true,
                            "img": "Frappé 1.jpg"
                        },
                        {
                            "value": "Frappé 3",
                            "isGrain": true,
                            "img": "Frappé 3.jpg"
                        },
                        {
                            "value": "Ice 1",
                            "isGrain": true,
                            "img": "Ice 1.jpg"
                        },
                        {
                            "value": "Ida 1",
                            "isGrain": true,
                            "img": "Ida 1.jpg"
                        },
                        {
                            "value": "Ida 2",
                            "isGrain": true,
                            "img": "Ida 2.jpg"
                        },
                        {
                            "value": "Ida 3",
                            "isGrain": true,
                            "img": "Ida 3.jpg"
                        },
                        {
                            "value": "Lakeland Oak 3",
                            "isGrain": true,
                            "img": "Lakeland Oak 3.jpg"
                        },
                        {
                            "value": "Muratti 1",
                            "isGrain": true,
                            "img": "Muratti 1.jpg"
                        },
                        {
                            "value": "Muratti 2",
                            "isGrain": true,
                            "img": "Muratti 2.jpg"
                        },
                        {
                            "value": "Muratti 3",
                            "isGrain": true,
                            "img": "Muratti 3.jpg"
                        },
                        {
                            "value": "Muratti 4",
                            "isGrain": true,
                            "img": "Muratti 4.jpg"
                        },
                        {
                            "value": "Nocce 1",
                            "isGrain": true,
                            "img": "Nocce 1.jpg"
                        },
                        {
                            "value": "Nocce 3",
                            "isGrain": true,
                            "img": "Nocce 3.jpg"
                        },
                        {
                            "value": "Olmo 3",
                            "isGrain": true,
                            "img": "Olmo 3.jpg"
                        },
                        {
                            "value": "Picasso 1",
                            "img": "Picasso 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Picasso 2",
                            "img": "Picasso 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Picasso 3",
                            "img": "Picasso 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 1",
                            "isGrain": true,
                            "img": "Rosales 1.jpg"
                        },
                        {
                            "value": "Rosales 2",
                            "isGrain": true,
                            "img": "Rosales 2.jpg"
                        },
                        {
                            "value": "Rosales 3",
                            "isGrain": true,
                            "img": "Rosales 3.jpg"
                        },
                        {
                            "value": "Siena",
                            "img": "Siena.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Textil Plata",
                            "img": "Textil Plata.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 1",
                            "img": "Velazquez 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 2",
                            "img": "Velazquez 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 5",
                            "img": "Velazquez 5.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Verde Nosta",
                            "img": "Verde Nosta.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Woodline 1",
                            "isGrain": true,
                            "img": "Woodline 1.jpg"
                        },
                        {
                            "value": "Woodline 3",
                            "isGrain": true,
                            "img": "Woodline 3.jpg"
                        },
                        {
                            "value": "Woodline 4",
                            "isGrain": true,
                            "img": "Woodline 4.jpg"
                        }
                    ]
                },
                {
                    "value": "Luxe",
                    "img": "luxe.jpg",
                    "colors": [
                        {
                            "value": "Agua Marina HG",
                            "img": "Agua Marina.jpg"
                        },
                        {
                            "value": "Antracita HG",
                            "img": "Antracita.jpg"
                        },
                        {
                            "value": "Antracita PE",
                            "img": "Antracita Pearl Effect.jpg"
                        },
                        {
                            "value": "Azul Indigo HG",
                            "img": "Azul Indigo.jpg"
                        },
                        {
                            "value": "Azul Marino HG",
                            "img": "Azul Marino.jpg"
                        },
                        {
                            "value": "Basalto HG",
                            "img": "Basalto.jpg"
                        },
                        {
                            "value": "Black HG",
                            "img": "Black.jpg"
                        },
                        {
                            "value": "Blanco Colonial PE",
                            "img": "Blanco Colonial Pearl Effect.jpg"
                        },
                        {
                            "value": "Blanco HG",
                            "img": "Supermatt Blanco.jpg"
                        },
                        {
                            "value": "Blanco Polar HG",
                            "img": "Blanco Polar.jpg"
                        },
                        {
                            "value": "Cashmere HG",
                            "img": "Cashmere.jpg"
                        },
                        {
                            "value": "Cuzco Oro HG",
                            "isGrain": true,
                            "img": "Cuzco Oro.jpg"
                        },
                        {
                            "value": "Euroline 3 HG",
                            "isGrain": true,
                            "img": "Euroline 3.jpg"
                        },
                        {
                            "value": "Gris Metallic HG",
                            "img": "Gris Metallic.jpg"
                        },
                        {
                            "value": "Gris Nube HG",
                            "img": "Gris Nube.jpg"
                        },
                        {
                            "value": "Gris Perla HG",
                            "img": "Gris Perla.jpg"
                        },
                        {
                            "value": "Gris Plomo HG",
                            "img": "Gris Plomo.jpg"
                        },
                        {
                            "value": "Guayana HG",
                            "isGrain": true,
                            "img": "Guayana.jpg"
                        },
                        {
                            "value": "Metallo 1 HG",
                            "isGrain": true,
                            "img": "Metallo 1.jpg"
                        },
                        {
                            "value": "Metallo 4 HG",
                            "isGrain": true,
                            "img": "Metallo 4.jpg"
                        },
                        {
                            "value": "Nuvola 3 HG",
                            "img": "Nuvola 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Olivo HG",
                            "isGrain": true,
                            "img": "Olivo.jpg"
                        },
                        {
                            "value": "Picasso 1 HG",
                            "img": "Picasso 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Olmo HG",
                            "isGrain": true,
                            "img": "Olmo.jpg"
                        },
                        {
                            "value": "Porcelain 1 HG",
                            "img": "Porcelain 1.jpg"
                        },
                        {
                            "value": "Textil Plata HG",
                            "img": "Textil Plata.jpg"
                        },
                        {
                            "value": "Textil Grafito HG",
                            "img": "Textil_Grafito.jpg"
                        }
                    ]
                },
                {
                    "value": "Ultrapan PET",
                    "img": "ultrapan.jpg",
                    "colors": [
                        {
                            "value": "Amalfi Noce Matte",
                            "img": "Ultrapan_PET/Amalfi Noce Matte.jpg"
                        },
                        {
                            "value": "Black Matte",
                            "img": "Ultrapan_PET/Black Matte.jpg"
                        },
                        {
                            "value": "Bright White Gloss",
                            "img": "Ultrapan_PET/Bright White Gloss.jpg"
                        },
                        {
                            "value": "Bright White Matte",
                            "img": "Ultrapan_PET/Bright White Matte.jpg"
                        },
                        {
                            "value": "Citadel Matte",
                            "img": "Ultrapan_PET/Citadel Matte.jpg"
                        },
                        {
                            "value": "Flint Matte",
                            "img": "Ultrapan_PET/Flint Matte.jpg"
                        },
                        {
                            "value": "Greystone Gloss",
                            "img": "Ultrapan_PET/Greystone Gloss.jpg"
                        },
                        {
                            "value": "Greystone Matte",
                            "img": "Ultrapan_PET/Greystone Matte.jpg"
                        },
                        {
                            "value": "Honey Mustard Matte",
                            "img": "Ultrapan_PET/Honey Mustard Matte.jpg"
                        },
                        {
                            "value": "London Fog Matte",
                            "img": "Ultrapan_PET/London Fog Matte.jpg"
                        },
                        {
                            "value": "Merlot Matte",
                            "img": "Ultrapan_PET/Merlot Matte.jpg"
                        },
                        {
                            "value": "Metallic Elm Matte",
                            "img": "Ultrapan_PET/Metallic Elm Matte.jpg"
                        },
                        {
                            "value": "Outer Space Matte",
                            "img": "Ultrapan_PET/Outer Space Matte.jpg"
                        },
                        {
                            "value": "Sheer Linen Gloss",
                            "img": "Ultrapan_PET/Sheer Linen Gloss.jpg"
                        },
                        {
                            "value": "Slate Grey Matte",
                            "img": "Ultrapan_PET/Slate Grey Matte.jpg"
                        },
                        {
                            "value": "Utaupia Gloss",
                            "img": "Ultrapan_PET/Utaupia Gloss.jpg"
                        },
                        {
                            "value": "Utaupia Matte",
                            "img": "Ultrapan_PET/Utaupia Matte.jpg"
                        },
                        {
                            "value": "White Gloss",
                            "img": "Ultrapan_PET/White Gloss.jpg"
                        },
                        {
                            "value": "White Matte",
                            "img": "Ultrapan_PET/White Matte.jpg"
                        },

                        {
                            "value": "Arizona SoftTouch",
                            "img": "Ultrapan_PET/Arizona SoftTouch.jpg"
                        },
                        {
                            "value": "Cashmere SoftTouch",
                            "img": "Ultrapan_PET/Cashmere SoftTouch.jpg"
                        },
                        {
                            "value": "Harbor Mist SoftTouch",
                            "img": "Ultrapan_PET/Harbor Mist SoftTouch.jpg"
                        },
                        {
                            "value": "Intercoastal SoftTouch",
                            "img": "Ultrapan_PET/Intercoastal SoftTouch.jpg"
                        },
                        {
                            "value": "Mint SoftTouch",
                            "img": "Ultrapan_PET/Mint SoftTouch.jpg"
                        },
                        {
                            "value": "Platinum SoftTouch",
                            "img": "Ultrapan_PET/Platinum SoftTouch.jpg"
                        },
                        {
                            "value": "Timberline SoftTouch",
                            "img": "Ultrapan_PET/Timberline SoftTouch.jpg"
                        },
                        {
                            "value": "Volcanic Rock SoftTouch",
                            "img": "Ultrapan_PET/Volcanic Rock SoftTouch.jpg"
                        },
                        {
                            "value": "Zinfandel SoftTouch",
                            "img": "Ultrapan_PET/Zinfandel SoftTouch.jpg"
                        }
                    ]
                },
                {
                    "value": "Zenit",
                    "img": "zenit.jpg",
                    "colors": [
                        {
                            "value": "Agua Marina SM",
                            "img": "Supermatt Agua Marina.jpg"
                        },
                        {
                            "value": "Antracita SM",
                            "img": "Supermatt Antracita.jpg"
                        },
                        {
                            "value": "Azul Índigo SM",
                            "img": "Supermatt Azul Índigo.jpg"
                        },
                        {
                            "value": "Azul Marino SM",
                            "img": "SuperMatt Azul Marino.jpg"
                        },
                        {
                            "value": "Arena SM",
                            "img": "Arena SM.jpg"
                        },
                        {
                            "value": "Basalto SM",
                            "img": "Supermatt Basalto.jpg"
                        },
                        {
                            "value": "Black SM",
                            "img": "Supermatt Black.jpg"
                        },
                        {
                            "value": "Blanco Polar SM",
                            "img": "Supermatt Blanco Polar.jpg"
                        },
                        {
                            "value": "Blanco SM",
                            "img": "Supermatt Blanco.jpg"
                        },
                        {
                            "value": "Cashmere SM",
                            "img": "Supermatt Cashmere.jpg"
                        },
                        {
                            "value": "Gris Nube SM",
                            "img": "Supermatt Gris Nube.jpg"
                        },
                        {
                            "value": "Gris Perla SM",
                            "img": "Supermatt Gris Perla.jpg"
                        },
                        {
                            "value": "Gris Plomo SM",
                            "img": "Supermatt Gris Plomo.jpg"
                        },
                        {
                            "value": "Verde Salvia SM",
                            "img": "SuperMatt Verde Salvia.jpg"
                        },
                        {
                            "value": "MetalDeco Black SM",
                            "img": "MetalDeco Black SM.jpg"
                        },
                        {
                            "value": "MetalDeco Blanco SM",
                            "img": "MetalDeco Blanco SM.jpg"
                        },
                        {
                            "value": "Taupe SM",
                            "img": "Taupe SM.jpg"
                        },
                        {
                            "value": "Nuvola 3 SM",
                            "img": "Nuvola 3.jpg",
                            "isGrain": true
                        }
                    ]
                },
                {
                    "value": "Ultrapan Acrylic",
                    "img": "ultrapan.jpg",
                    colors: [
                        {
                            "value": "Eclipse Grey Gloss",
                            "img": "Ultrapan_Acrylic/Eclipse Grey Gloss.jpg"
                        },
                        {
                            "value": "Galactic Grey Gloss",
                            "img": "Ultrapan_Acrylic/Galactic Grey Gloss.jpg"
                        },
                        {
                            "value": "Jet Black Gloss",
                            "img": "Ultrapan_Acrylic/Jet Black Gloss.jpg"
                        },
                        {
                            "value": "Pebble Matte",
                            "img": "Ultrapan_Acrylic/Pebble Matte.jpg"
                        },
                        {
                            "value": "Royal Blue Gloss",
                            "img": "Ultrapan_Acrylic/Royal Blue Gloss.jpg"
                        },
                        {
                            "value": "Seal Grey Gloss",
                            "img": "Ultrapan_Acrylic/Seal Grey Gloss.jpg"
                        },
                        {
                            "value": "Champagne Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Champagne Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Dark Grey Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Dark Grey Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Silver Mettalic Gloss",
                            "img": "Ultrapan_Acrylic/Silver Mettalic Gloss.jpg"
                        },
                        {
                            "value": "Silver Mettalic Matte",
                            "img": "Ultrapan_Acrylic/Silver Mettalic Matte.jpg"
                        },
                    ]
                },
                {
                    "value": "Wood Veneer",
                    "img": "wood-veneer.jpg",
                    "colors": [
                        {
                            "value": "Desert Oak",
                            "img": "wood-veneer/Desert Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Frozen Walnut",
                            "img": "wood-veneer/Frozen Walnut.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ivory Oak",
                            "img": "wood-veneer/Ivory Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Manhattan Oak",
                            "img": "wood-veneer/Manhattan Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Milk Oak",
                            "img": "wood-veneer/Milk Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Pebble Triba",
                            "img": "wood-veneer/Pebble Triba.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Pure Walnut",
                            "img": "wood-veneer/Pure Walnut.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Smoked Walnut",
                            "img": "wood-veneer/Smoked Walnut.jpg",
                            "isGrain": true
                        }
                    ]
                },
                {
                    "value": "Finsa",
                    "img": "finsa.jpg",
                    "colors": [
                        {
                            "value": "Biscuit 36W",
                            "img": "finsa/Biscuit 36W.jpg"
                        },
                        {
                            "value": "Blackwood 231",
                            "img": "finsa/Blackwood 231.jpg"
                        },
                        {
                            "value": "Blanco Medio 020",
                            "img": "finsa/Blanco Medio 020.jpg"
                        },
                        {
                            "value": "Bohemian Blanco 3AT",
                            "img": "finsa/Bohemian Blanco 3AT.jpg"
                        },
                        {
                            "value": "Cemento 06F",
                            "img": "finsa/Cemento 06F.jpg"
                        },
                        {
                            "value": "Espiga Pimienta 97Q",
                            "img": "finsa/Espiga Pimienta 97Q.jpg"
                        },
                        {
                            "value": "Espiga Sal 98Q",
                            "img": "finsa/Espiga Sal 98Q.jpg"
                        },
                        {
                            "value": "Essenza Oak 631B",
                            "img": "finsa/Essenza Oak 631B.jpg"
                        },
                        {
                            "value": "Fresno Glacial 16N",
                            "img": "finsa/Fresno Glacial 16N.jpg"
                        },
                        {
                            "value": "Gris Coco 15R",
                            "img": "finsa/Gris Coco 15R.jpg"
                        },
                        {
                            "value": "Gris Cuatro 206",
                            "img": "finsa/Gris Cuatro 206.jpg"
                        },
                        {
                            "value": "Gris Gu 71A",
                            "img": "finsa/Gris Gu 71A.jpg"
                        },
                        {
                            "value": "Gris Suave 60V",
                            "img": "finsa/Gris Suave 60V.jpg"
                        },
                        {
                            "value": "Lecer 251B",
                            "img": "finsa/Lecer 251B.jpg"
                        },
                        {
                            "value": "Lino Cancun 12G",
                            "img": "finsa/Lino Cancun 12G.jpg"
                        },
                        {
                            "value": "Lino Esteiro 79G",
                            "img": "finsa/Lino Esteiro 79G.jpg"
                        },
                        {
                            "value": "Lino Nassau 614B",
                            "img": "finsa/Lino Nassau 614B.jpg"
                        },
                        {
                            "value": "Marmol Blanco 72Y",
                            "img": "finsa/Marmol Blanco 72Y.jpg"
                        },
                        {
                            "value": "Marmol Hades 1AT",
                            "img": "finsa/Marmol Hades 1AT.jpg"
                        },
                        {
                            "value": "Mineral Grey 40Y",
                            "img": "finsa/Mineral Grey 40Y.jpg"
                        },
                        {
                            "value": "Natural Grey U12",
                            "img": "finsa/Natural Grey U12.jpg"
                        },
                        {
                            "value": "Nogal Slow 5AE",
                            "img": "finsa/Nogal Slow 5AE.jpg"
                        },
                        {
                            "value": "Olmo Grace 449B",
                            "img": "finsa/Olmo Grace 449B.jpg"
                        },
                        {
                            "value": "Richmond Plum 37E",
                            "img": "finsa/Richmond Plum 37E.jpg"
                        },
                        {
                            "value": "Roble Aurora 98V",
                            "img": "finsa/Roble Aurora 98V.jpg"
                        },
                        {
                            "value": "Roble Azabache 75V",
                            "img": "finsa/Roble Azabache 75V.jpg"
                        },
                        {
                            "value": "Roble Bello 008",
                            "img": "finsa/Roble Bello 008.jpg"
                        },
                        {
                            "value": "Roble Colorado 97V",
                            "img": "finsa/Roble Colorado 97V.jpg"
                        },
                        {
                            "value": "Roble Cooper 452B",
                            "img": "finsa/Roble Cooper 452B.jpg"
                        },
                        {
                            "value": "Roble Denver 84V",
                            "img": "finsa/Roble Denver 84V.jpg"
                        },
                        {
                            "value": "Roble Eternity 4AE",
                            "img": "finsa/Roble Eternity 4AE.jpg"
                        },
                        {
                            "value": "Roble Joplin 17N",
                            "img": "finsa/Roble Joplin 17N.jpg"
                        },
                        {
                            "value": "Roble Newman 451B",
                            "img": "finsa/Roble Newman 451B.jpg"
                        },
                        {
                            "value": "Roble Oasis 3AE",
                            "img": "finsa/Roble Oasis 3AE.jpg"
                        },
                        {
                            "value": "Roble Stella 74V",
                            "img": "finsa/Roble Stella 74V.jpg"
                        },
                        {
                            "value": "Roble Trigo 42B",
                            "img": "finsa/Roble Trigo 42B.jpg"
                        },
                        {
                            "value": "Sostanza Oak 632B",
                            "img": "finsa/Sostanza Oak 632B.jpg"
                        },
                        {
                            "value": "Tasmanian Natural 212B",
                            "img": "finsa/Tasmanian Natural 212B.jpg"
                        },
                        {
                            "value": "Tessuto 70F",
                            "img": "finsa/Tessuto 70F.jpg"
                        },
                        {
                            "value": "White 78E",
                            "img": "finsa/White 78E.jpg"
                        }
                    ]
                },
                {
                    "value": "Egger",
                    "img": "egger.jpg",
                    "colors": [
                        {
                            "value": "F416 Beige Textile",
                            "img": "erger/F416 Beige Textile.jpg"
                        },
                        {
                            "value": "F417 Grey Textile",
                            "img": "erger/F417 Grey Textile.jpg"
                        },
                        {
                            "value": "F422 White Linen",
                            "img": "erger/F422 White Linen.jpg"
                        },
                        {
                            "value": "F433 Anthracite Linen",
                            "img": "erger/F433 Anthracite Linen.jpg"
                        },
                        {
                            "value": "F638 Chromix Silver",
                            "img": "erger/F638 Chromix Silver.jpg"
                        },
                        {
                            "value": "H1180 Natural Halifax Oak",
                            "img": "erger/H1180 Natural Halifax Oak.jpg"
                        },
                        {
                            "value": "H1210 Grey-Beige Tossini Elm",
                            "img": "erger/H1210 Grey-Beige Tossini Elm.jpg"
                        },
                        {
                            "value": "H1222 Fox Grey Tossini Elm",
                            "img": "erger/H1222 Fox Grey Tossini Elm.jpg"
                        },
                        {
                            "value": "H1288 Stone Grey Frozen Wood",
                            "img": "erger/H1288 Stone Grey Frozen Wood.jpg"
                        },
                        {
                            "value": "H1290 White Frozen Wood",
                            "img": "erger/H1290 White Frozen Wood.jpg"
                        },
                        {
                            "value": "H1292 Carbon Frozen Wood",
                            "img": "erger/H1292 Carbon Frozen Wood.jpg"
                        },
                        {
                            "value": "H1367 Light Natural Casella",
                            "img": "erger/H1367 Light Natural Casella.jpg"
                        },
                        {
                            "value": "H1384 White Casella Oak",
                            "img": "erger/H1384 White Casella Oak.jpg"
                        },
                        {
                            "value": "H1701 White Tossini Elm",
                            "img": "erger/H1701 White Tossini Elm.jpg"
                        },
                        {
                            "value": "H1714 Lincoln Walnut",
                            "img": "erger/H1714 Lincoln Walnut.jpg"
                        },
                        {
                            "value": "H1815 Hardrock Maple",
                            "img": "erger/H1815 Hardrock Maple.jpg"
                        },
                        {
                            "value": "H3078 White Havana Pine",
                            "img": "erger/H3078 White Havana Pine.jpg"
                        },
                        {
                            "value": "H3081 Black Havana Pine",
                            "img": "erger/H3081 Black Havana Pine.jpg"
                        },
                        {
                            "value": "H3157 Vicenza Oak",
                            "img": "erger/H3157 Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3158 Grey Vicenza Oak",
                            "img": "erger/H3158 Grey Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3165 Light Vicenza Oak",
                            "img": "erger/H3165 Light Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3171 Oiled Kendal Oak",
                            "img": "erger/H3171 Oiled Kendal Oak.jpg"
                        },
                        {
                            "value": "H3195 White Fineline",
                            "img": "erger/H3195 White Fineline.jpg"
                        },
                        {
                            "value": "H3790 Honey Carini Walnut",
                            "img": "erger/H3790 Honey Carini Walnut.jpg"
                        },
                        {
                            "value": "H3791 Carini Auburn Walnut",
                            "img": "erger/H3791 Carini Auburn Walnut.jpg"
                        },
                        {
                            "value": "H3794 Chocolate Carini Walnut",
                            "img": "erger/H3794 Chocolate Carini Walnut.jpg"
                        },
                        {
                            "value": "U201 Pebble Grey",
                            "img": "erger/U201 Pebble Grey.jpg"
                        },
                        {
                            "value": "U502 Misty Blue",
                            "img": "erger/U502 Misty Blue.jpg"
                        },
                        {
                            "value": "U702 Cashmere Grey",
                            "img": "erger/U702 Cashmere Grey.jpg"
                        },
                        {
                            "value": "U705 Angora Grey",
                            "img": "erger/U705 Angora Grey.jpg"
                        },
                        {
                            "value": "U727 Stone Grey",
                            "img": "erger/U727 Stone Grey.jpg"
                        },
                        {
                            "value": "U765 Silver Grey",
                            "img": "erger/U765 Silver Grey.jpg"
                        },
                        {
                            "value": "U779 Fog Grey",
                            "img": "erger/U779 Fog Grey.jpg"
                        },
                        {
                            "value": "U780 Monument Grey",
                            "img": "erger/U780 Monument Grey.jpg"
                        },
                        {
                            "value": "U963 Diamond Grey",
                            "img": "erger/U963 Diamond Grey.jpg"
                        },
                        {
                            "value": "U999 ST7 Black",
                            "img": "erger/U999 ST7 Black.jpg"
                        },
                        {
                            "value": "U999 ST19 Black",
                            "img": "erger/U999 ST19 Black.jpg"
                        },
                        {
                            "value": "W960 Classic White",
                            "img": "erger/W960 Classic White.jpg"
                        },
                        {
                            "value": "W1100 ST9 Alpine White",
                            "img": "erger/W1100 ST9 Alpine White - Copy.jpg"
                        },
                        {
                            "value": "W1100 ST19 Alpine White",
                            "img": "erger/W1100 ST19 Alpine White.jpg"
                        }
                    ]
                },
                {
                    "value": "Cleaf",
                    "img": "cleaf.jpg",
                    "colors": [
                        {
                            "value": "Ares Night UB02",
                            "img": "cleaf/Ares Night UB02.jpg"
                        },
                        {
                            "value": "Cheope Total White BO73",
                            "img": "cleaf/Cheope Total White BO73.jpg"
                        },
                        {
                            "value": "Fronda Bardini S164",
                            "img": "cleaf/Fronda Bardini S164.jpg"
                        },
                        {
                            "value": "Jiometori Naoshima S191",
                            "img": "cleaf/Jiometori Naoshima S191.jpg"
                        },
                        {
                            "value": "Jiometori Teshima S192",
                            "img": "cleaf/Jiometori Teshima S192.jpg"
                        },
                        {
                            "value": "Matrix Bianco BO11",
                            "img": "cleaf/Matrix Bianco BO11.jpg"
                        },
                        {
                            "value": "Matrix Carbone LM08",
                            "img": "cleaf/Matrix Carbone LM08.jpg"
                        },
                        {
                            "value": "Matrix Vineyard Oak LN30",
                            "img": "cleaf/Matrix Vineyard Oak LN30.jpg"
                        },
                        {
                            "value": "Okobo Meguro S160",
                            "img": "cleaf/Okobo Meguro S160.jpg"
                        },
                        {
                            "value": "Okobo Nakano S162",
                            "img": "cleaf/Okobo Nakano S162.jpg"
                        },
                        {
                            "value": "Poro Noce Acerno LS14",
                            "img": "cleaf/Poro Noce Acerno LS14.jpg"
                        },
                        {
                            "value": "Poro Noce Giffoni LS13",
                            "img": "cleaf/Poro Noce Giffoni LS13.jpg"
                        },
                        {
                            "value": "Primofiore Bianco BO11",
                            "img": "cleaf/Primofiore Bianco BO11.jpg"
                        },
                        {
                            "value": "Primofiore Maya Bronze FA33",
                            "img": "cleaf/Primofiore Maya Bronze FA33.jpg"
                        },
                        {
                            "value": "Sable Ascari LR25",
                            "img": "cleaf/Sable Ascari LR25.jpg"
                        },
                        {
                            "value": "Sherwood Brolio Oak LR09",
                            "img": "cleaf/Sherwood Brolio Oak LR09.jpg"
                        },
                        {
                            "value": "Sherwood Gavi Oak LN66",
                            "img": "cleaf/Sherwood Gavi Oak LN66.jpg"
                        },
                        {
                            "value": "Sherwood Toasted Espresso SO71",
                            "img": "cleaf/Sherwood Toasted Espresso SO71.jpg"
                        },
                        {
                            "value": "Yosemite Cypress Point SO13",
                            "img": "cleaf/Yosemite Cypress Point SO13.jpg"
                        }
                    ]
                },
                {
                    "value": "OneSkin",
                    "img": "oneSkin.jpg",
                    "colors": [
                        {
                            "value": "Black HG",
                            "img": "oneSkin/Black HG.jpg"
                        },
                        {
                            "value": "Black Oak HG",
                            "img": "oneSkin/Black Oak HG.jpg"
                        },
                        {
                            "value": "Black Oak SM",
                            "img": "oneSkin/Black Oak SM.jpg"
                        },
                        {
                            "value": "Black SM",
                            "img": "oneSkin/Black SM.jpg"
                        },
                        {
                            "value": "Carbon Oak HG",
                            "img": "oneSkin/Carbon Oak HG.jpg"
                        },
                        {
                            "value": "Carbon Oak SM",
                            "img": "oneSkin/Carbon Oak SM.jpg"
                        },
                        {
                            "value": "Cashmere HG",
                            "img": "oneSkin/Cashmere HG.jpg"
                        },
                        {
                            "value": "Cashmere SM",
                            "img": "oneSkin/Cashmere SM.jpg"
                        },
                        {
                            "value": "Denim Blue HG",
                            "img": "oneSkin/Denim Blue HG.jpg"
                        },
                        {
                            "value": "Denim Blue SM",
                            "img": "oneSkin/Denim Blue SM.jpg"
                        },
                        {
                            "value": "Fossil Oak HG",
                            "img": "oneSkin/Fossil Oak HG.jpg"
                        },
                        {
                            "value": "Fossil Oak SM",
                            "img": "oneSkin/Fossil Oak SM.jpg"
                        },
                        {
                            "value": "Grey HG",
                            "img": "oneSkin/Grey HG.jpg"
                        },
                        {
                            "value": "Grey SM",
                            "img": "oneSkin/Grey SM.jpg"
                        },
                        {
                            "value": "Lava Grey HG",
                            "img": "oneSkin/Lava Grey HG.jpg"
                        },
                        {
                            "value": "Lava Grey SM",
                            "img": "oneSkin/Lava Grey SM.jpg"
                        },
                        {
                            "value": "Light Grey HG",
                            "img": "oneSkin/Light Grey HG.jpg"
                        },
                        {
                            "value": "Light Grey SM",
                            "img": "oneSkin/Light Grey SM.jpg"
                        },
                        {
                            "value": "Light Walnut HG",
                            "img": "oneSkin/Light Walnut HG.jpg"
                        },
                        {
                            "value": "Light Walnut SM",
                            "img": "oneSkin/Light Walnut SM.jpg"
                        },
                        {
                            "value": "Natural Cement HG",
                            "img": "oneSkin/Natural Cement HG.jpg"
                        },
                        {
                            "value": "Natural Cement SM",
                            "img": "oneSkin/Natural Cement SM.jpg"
                        },
                        {
                            "value": "Natural Oak HG",
                            "img": "oneSkin/Natural Oak HG.jpg"
                        },
                        {
                            "value": "Natural Oak SM",
                            "img": "oneSkin/Natural Oak SM.jpg"
                        },
                        {
                            "value": "Old Oak HG",
                            "img": "oneSkin/Old Oak HG.jpg"
                        },
                        {
                            "value": "Old Oak SM",
                            "img": "oneSkin/Old Oak SM.jpg"
                        },
                        {
                            "value": "Smoked Elm HG",
                            "img": "oneSkin/Smoked Elm HG.jpg"
                        },
                        {
                            "value": "Smoked Elm SM",
                            "img": "oneSkin/Smoked Elm SM.jpg"
                        },
                        {
                            "value": "Sunny White HG",
                            "img": "oneSkin/Sunny White HG.jpg"
                        },
                        {
                            "value": "Sunny White SM",
                            "img": "oneSkin/Sunny White SM.jpg"
                        },
                        {
                            "value": "Torino Oak 2 HG",
                            "img": "oneSkin/Torino Oak 2 HG.jpg"
                        },
                        {
                            "value": "Torino Oak 2 SM",
                            "img": "oneSkin/Torino Oak 2 SM.jpg"
                        },
                        {
                            "value": "Tortora HG",
                            "img": "oneSkin/Tortora HG.jpg"
                        },
                        {
                            "value": "Tortora SM",
                            "img": "oneSkin/Tortora SM.jpg"
                        },
                        {
                            "value": "White Elm HG",
                            "img": "oneSkin/White Elm HG.jpg"
                        },
                        {
                            "value": "White Elm SM",
                            "img": "oneSkin/White Elm SM.jpg"
                        }
                    ]
                }
            ],
            "frame": [
                {
                    "value": "0.75",
                    "img": "frame0.75.jpg"
                },
                {
                    "value": "1",
                    "img": "frame1.jpg"
                },
                {
                    "value": "1.25",
                    "img": "frame1.25.jpg",
                    "is_hide": true
                },
                {
                    "value": "1.5",
                    "img": "frame1.5.jpg"
                },
                {
                    "value": "2",
                    "img": "frame2.jpg"
                },
                {
                    "value": "2.5",
                    "img": "frame2.5.jpg"
                }
            ]
        },
        {
            "value": "Slatted",
            "img": "Doors Slatted.jpg",
            "finish": [
                {
                    "value": "Milino",
                    "img": "milino.jpg",
                    "colors": [
                        {
                            "value": "White Melamine",
                            "img": "White-Melamine.jpg"
                        },
                        {
                            "value": "Grey Melamine",
                            "img": "Gray-Melamine.jpg"
                        },
                        {
                            "value": "Grey Linen Melamine",
                            "img": "Gray-Linen-Melamine.jpg"
                        },
                        {
                            "value": "Beige Linen Melamine",
                            "img": "Beige-Linen-Melamine.jpg"
                        },
                        {
                            "value": "Ash Melamine",
                            "img": "Ash-Melamine-1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Walnut Melamine",
                            "img": "Walnut-Melamine.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brown Oak",
                            "img": "Brown Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ivory Woodline",
                            "img": "Ivory Woodline.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Sable Wood",
                            "img": "Sable Wood.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Grey Woodline",
                            "img": "Grey Woodline.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "White Oak",
                            "img": "White Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Desert Oak",
                            "img": "Desert Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Glacier Oak",
                            "img": "Glacial_Oak.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ultra Matte White",
                            "img": "Ultra Matte White.jpg"
                        },
                        {
                            "value": "Ultra Matte Grey",
                            "img": "Ultra Matte Grey.jpg"
                        },
                        {
                            "value": "Ultra Matte Cashmere",
                            "img": "Cashmere.jpg"
                        },
                        {
                            "value": "Ultra Matte Gris",
                            "img": "UltraMatte Gris.jpg"
                        },
                        {
                            "value": "Ultra Matte Volcano",
                            "img": "UltraMatte_Volcano.jpg"
                        },
                        {
                            "value": "White Gloss",
                            "img": "White.jpg"
                        }
                    ]
                },
                {
                    "value": "Syncron",
                    "img": "syncron.jpg",
                    "colors": [
                        {
                            "value": "Alhambra 1",
                            "img": "Alhambra 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Alhambra 2",
                            "img": "Alhambra 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Alhambra 3",
                            "img": "Alhambra 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Black Minerva",
                            "img": "Black Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Cashmere Minerva",
                            "img": "Cashmere Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Black",
                            "img": "Reeded Black.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Blanco",
                            "img": "Reeded Blanco.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Reeded Cashmere",
                            "img": "Reeded Cashmere.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 4",
                            "img": "Rosales 4.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 1",
                            "img": "Velazquez 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 2",
                            "img": "Velazquez 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Velazquez 5",
                            "img": "Velazquez 5.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "White Minerva",
                            "img": "White Minerva.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Anniversary Oak 2",
                            "img": "Anniversary Oak 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Bernini",
                            "img": "Bernini.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brushed Concrete 1",
                            "img": "Brushed Concrete 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Brushed Concrete 2",
                            "img": "Brushed Concrete 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Como Ash 1",
                            "img": "Como Ash 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Como Ash 2",
                            "img": "Como Ash 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Como Ash 3",
                            "img": "Como Ash 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Evora 4",
                            "img": "Evora 4.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Frappe 1",
                            "img": "Frappé 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Frappe 3",
                            "img": "Frappé 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ice 1",
                            "img": "Ice 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ida 1",
                            "img": "Ida 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ida 2",
                            "img": "Ida 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Ida 3",
                            "img": "Ida 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Lakeland Oak 3",
                            "img": "Lakeland Oak 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Muratti 1",
                            "img": "Muratti 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Muratti 2",
                            "img": "Muratti 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Muratti 3",
                            "img": "Muratti 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Muratti 4",
                            "img": "Muratti 4.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Nocce 1",
                            "img": "Nocce 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Nocce 3",
                            "img": "Nocce 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Olmo 3",
                            "img": "Olmo 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Picasso 1",
                            "img": "Picasso 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Picasso 2",
                            "img": "Picasso 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Picasso 3",
                            "img": "Picasso 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 1",
                            "img": "Rosales 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 2",
                            "img": "Rosales 2.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Rosales 3",
                            "img": "Rosales 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Siena",
                            "img": "Siena.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Textil Plata",
                            "img": "Textil Plata.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Verde Nosta",
                            "img": "Verde Nosta.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Woodline 1",
                            "isGrain": true,
                            "img": "Woodline 1.jpg"
                        },
                        {
                            "value": "Woodline 3",
                            "isGrain": true,
                            "img": "Woodline 3.jpg"
                        },
                        {
                            "value": "Woodline 4",
                            "isGrain": true,
                            "img": "Woodline 4.jpg"
                        }
                    ]
                },
                {
                    "value": "Luxe",
                    "img": "luxe.jpg",
                    "colors": [
                        {
                            "value": "Albero HG",
                            "img": "Albero HG.jpg"
                        },
                        {
                            "value": "Arena HG",
                            "img": "Arena HG.jpg"
                        },
                        {
                            "value": "Pompei HG",
                            "img": "Pompei HG.jpg"
                        },
                        {
                            "value": "Siena HG",
                            "img": "Siena HG.jpg"
                        },
                        {
                            "value": "Velazquez 1 HG",
                            "img": "Velazquez 1 HG.jpg"
                        },
                        {
                            "value": "Agua Marina HG",
                            "img": "Agua Marina.jpg"
                        },
                        {
                            "value": "Antracita HG",
                            "img": "Antracita.jpg"
                        },
                        {
                            "value": "Antracita PE",
                            "img": "Antracita Pearl Effect.jpg"
                        },
                        {
                            "value": "Azul Indigo HG",
                            "img": "Azul Indigo.jpg"
                        },
                        {
                            "value": "Azul Marino HG",
                            "img": "Azul Marino.jpg"
                        },
                        {
                            "value": "Basalto HG",
                            "img": "Basalto.jpg"
                        },
                        {
                            "value": "Bernini HG",
                            "img": "Bernini.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Black HG",
                            "img": "Black.jpg"
                        },
                        {
                            "value": "Blanco Colonial PE",
                            "img": "Blanco Colonial Pearl Effect.jpg"
                        },
                        {
                            "value": "Blanco HG",
                            "img": "Supermatt Blanco.jpg"
                        },
                        {
                            "value": "Blanco Polar HG",
                            "img": "Blanco Polar.jpg"
                        },
                        {
                            "value": "Cashmere HG",
                            "img": "Cashmere.jpg"
                        },
                        {
                            "value": "Cuzco Oro HG",
                            "isGrain": true,
                            "img": "Cuzco Oro.jpg"
                        },
                        {
                            "value": "Euroline 3 HG",
                            "isGrain": true,
                            "img": "Euroline 3.jpg"
                        },
                        {
                            "value": "Gris Metallic HG",
                            "img": "Gris Metallic.jpg"
                        },
                        {
                            "value": "Gris Nube HG",
                            "img": "Gris Nube.jpg"
                        },
                        {
                            "value": "Gris Perla HG",
                            "img": "Gris Perla.jpg"
                        },
                        {
                            "value": "Gris Plomo HG",
                            "img": "Gris Plomo.jpg"
                        },
                        {
                            "value": "Guayana HG",
                            "isGrain": true,
                            "img": "Guayana.jpg"
                        },
                        {
                            "value": "Metallo 1 HG",
                            "isGrain": true,
                            "img": "Metallo 1.jpg"
                        },
                        {
                            "value": "Metallo 4 HG",
                            "isGrain": true,
                            "img": "Metallo 4.jpg"
                        },
                        {
                            "value": "Nuvola 3 HG",
                            "img": "Nuvola 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Olivo HG",
                            "isGrain": true,
                            "img": "Olivo.jpg"
                        },
                        {
                            "value": "Olmo HG",
                            "isGrain": true,
                            "img": "Olmo.jpg"
                        },
                        {
                            "value": "Picasso 1 HG",
                            "img": "Picasso 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Porcelain 1 HG",
                            "img": "Porcelain 1.jpg"
                        },
                        {
                            "value": "Rosales 3 HG",
                            "isGrain": true,
                            "img": "Rosales 3.jpg"
                        },
                        {
                            "value": "Textil Plata HG",
                            "img": "Textil Plata.jpg"
                        }
                    ]
                },
                {
                    "value": "Zenit",
                    "img": "zenit.jpg",
                    "colors": [
                        {
                            "value": "Alba White SM",
                            "img": "Alba White SM.jpg"
                        },
                        {
                            "value": "Albero SM",
                            "img": "Albero SM.jpg"
                        },
                        {
                            "value": "Arena SM",
                            "img": "Arena SM.jpg"
                        },
                        {
                            "value": "Coral SM",
                            "img": "Coral SM.jpg"
                        },
                        {
                            "value": "MetalPlus Champagne",
                            "img": "MetalPlus Champagne.jpg"
                        },
                        {
                            "value": "Pompei SM",
                            "img": "Pompei SM.jpg"
                        },
                        {
                            "value": "Taupe SM",
                            "img": "Taupe SM.jpg"
                        },
                        {
                            "value": "Agave SM",
                            "img": "Agave.jpg"
                        },
                        {
                            "value": "Agua Marina SM",
                            "img": "Supermatt Agua Marina.jpg"
                        },
                        {
                            "value": "Antracita SM",
                            "img": "Supermatt Antracita.jpg"
                        },
                        {
                            "value": "Azul Índigo SM",
                            "img": "Supermatt Azul Índigo.jpg"
                        },
                        {
                            "value": "Azul Marino SM",
                            "img": "SuperMatt Azul Marino.jpg"
                        },
                        {
                            "value": "Basalto SM",
                            "img": "Supermatt Basalto.jpg"
                        },
                        {
                            "value": "Black SM",
                            "img": "Supermatt Black.jpg"
                        },
                        {
                            "value": "Blanco Polar SM",
                            "img": "Supermatt Blanco Polar.jpg"
                        },
                        {
                            "value": "Blanco SM",
                            "img": "Supermatt Blanco.jpg"
                        },
                        {
                            "value": "Cashmere SM",
                            "img": "Supermatt Cashmere.jpg"
                        },
                        {
                            "value": "Gris Nube SM",
                            "img": "Supermatt Gris Nube.jpg"
                        },
                        {
                            "value": "Gris Perla SM",
                            "img": "Supermatt Gris Perla.jpg"
                        },
                        {
                            "value": "Gris Plomo SM",
                            "img": "Supermatt Gris Plomo.jpg"
                        },
                        {
                            "value": "Nuvola 3 SM",
                            "img": "Nuvola 3.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Titán 1 SM",
                            "img": "Supermatt Titán 1.jpg",
                            "isGrain": true
                        },
                        {
                            "value": "Verde Salvia SM",
                            "img": "SuperMatt Verde Salvia.jpg"
                        },
                        {
                            "value": "MetalDeco Black SM",
                            "img": "MetalDeco Black SM.jpg"
                        },
                        {
                            "value": "MetalDeco Blanco SM",
                            "img": "MetalDeco Blanco SM.jpg"
                        },
                        {
                            "value": "MetalPlus Light Gold",
                            "img": "Metal Plus Light Gold.jpg"
                        },
                        {
                            "value": "MetalPlus Titanio SM",
                            "img": "Metal Plus Titanio SM.jpg"
                        }
                    ]
                },
                {
                    "value": "Finsa",
                    "img": "finsa.jpg",
                    "colors": [
                        {
                            "value": "Biscuit 36W",
                            "img": "finsa/Biscuit 36W.jpg"
                        },
                        {
                            "value": "Blackwood 231",
                            "img": "finsa/Blackwood 231.jpg"
                        },
                        {
                            "value": "Blanco Medio 020",
                            "img": "finsa/Blanco Medio 020.jpg"
                        },
                        {
                            "value": "Bohemian Blanco 3AT",
                            "img": "finsa/Bohemian Blanco 3AT.jpg"
                        },
                        {
                            "value": "Cemento 06F",
                            "img": "finsa/Cemento 06F.jpg"
                        },
                        {
                            "value": "Espiga Pimienta 97Q",
                            "img": "finsa/Espiga Pimienta 97Q.jpg"
                        },
                        {
                            "value": "Espiga Sal 98Q",
                            "img": "finsa/Espiga Sal 98Q.jpg"
                        },
                        {
                            "value": "Essenza Oak 631B",
                            "img": "finsa/Essenza Oak 631B.jpg"
                        },
                        {
                            "value": "Fresno Glacial 16N",
                            "img": "finsa/Fresno Glacial 16N.jpg"
                        },
                        {
                            "value": "Gris Coco 15R",
                            "img": "finsa/Gris Coco 15R.jpg"
                        },
                        {
                            "value": "Gris Cuatro 206",
                            "img": "finsa/Gris Cuatro 206.jpg"
                        },
                        {
                            "value": "Gris Gu 71A",
                            "img": "finsa/Gris Gu 71A.jpg"
                        },
                        {
                            "value": "Gris Suave 60V",
                            "img": "finsa/Gris Suave 60V.jpg"
                        },
                        {
                            "value": "Lecer 251B",
                            "img": "finsa/Lecer 251B.jpg"
                        },
                        {
                            "value": "Lino Cancun 12G",
                            "img": "finsa/Lino Cancun 12G.jpg"
                        },
                        {
                            "value": "Lino Esteiro 79G",
                            "img": "finsa/Lino Esteiro 79G.jpg"
                        },
                        {
                            "value": "Lino Nassau 614B",
                            "img": "finsa/Lino Nassau 614B.jpg"
                        },
                        {
                            "value": "Marmol Blanco 72Y",
                            "img": "finsa/Marmol Blanco 72Y.jpg"
                        },
                        {
                            "value": "Marmol Hades 1AT",
                            "img": "finsa/Marmol Hades 1AT.jpg"
                        },
                        {
                            "value": "Mineral Grey 40Y",
                            "img": "finsa/Mineral Grey 40Y.jpg"
                        },
                        {
                            "value": "Natural Grey U12",
                            "img": "finsa/Natural Grey U12.jpg"
                        },
                        {
                            "value": "Nogal Slow 5AE",
                            "img": "finsa/Nogal Slow 5AE.jpg"
                        },
                        {
                            "value": "Olmo Grace 449B",
                            "img": "finsa/Olmo Grace 449B.jpg"
                        },
                        {
                            "value": "Richmond Plum 37E",
                            "img": "finsa/Richmond Plum 37E.jpg"
                        },
                        {
                            "value": "Roble Aurora 98V",
                            "img": "finsa/Roble Aurora 98V.jpg"
                        },
                        {
                            "value": "Roble Azabache 75V",
                            "img": "finsa/Roble Azabache 75V.jpg"
                        },
                        {
                            "value": "Roble Bello 008",
                            "img": "finsa/Roble Bello 008.jpg"
                        },
                        {
                            "value": "Roble Colorado 97V",
                            "img": "finsa/Roble Colorado 97V.jpg"
                        },
                        {
                            "value": "Roble Cooper 452B",
                            "img": "finsa/Roble Cooper 452B.jpg"
                        },
                        {
                            "value": "Roble Denver 84V",
                            "img": "finsa/Roble Denver 84V.jpg"
                        },
                        {
                            "value": "Roble Eternity 4AE",
                            "img": "finsa/Roble Eternity 4AE.jpg"
                        },
                        {
                            "value": "Roble Joplin 17N",
                            "img": "finsa/Roble Joplin 17N.jpg"
                        },
                        {
                            "value": "Roble Newman 451B",
                            "img": "finsa/Roble Newman 451B.jpg"
                        },
                        {
                            "value": "Roble Oasis 3AE",
                            "img": "finsa/Roble Oasis 3AE.jpg"
                        },
                        {
                            "value": "Roble Stella 74V",
                            "img": "finsa/Roble Stella 74V.jpg"
                        },
                        {
                            "value": "Roble Trigo 42B",
                            "img": "finsa/Roble Trigo 42B.jpg"
                        },
                        {
                            "value": "Sostanza Oak 632B",
                            "img": "finsa/Sostanza Oak 632B.jpg"
                        },
                        {
                            "value": "Tasmanian Natural 212B",
                            "img": "finsa/Tasmanian Natural 212B.jpg"
                        },
                        {
                            "value": "Tessuto 70F",
                            "img": "finsa/Tessuto 70F.jpg"
                        },
                        {
                            "value": "White 78E",
                            "img": "finsa/White 78E.jpg"
                        }
                    ]
                },
                {
                    "value": "Egger",
                    "img": "egger.jpg",
                    "colors": [
                        {
                            "value": "F416 Beige Textile",
                            "img": "erger/F416 Beige Textile.jpg"
                        },
                        {
                            "value": "F417 Grey Textile",
                            "img": "erger/F417 Grey Textile.jpg"
                        },
                        {
                            "value": "F422 White Linen",
                            "img": "erger/F422 White Linen.jpg"
                        },
                        {
                            "value": "F433 Anthracite Linen",
                            "img": "erger/F433 Anthracite Linen.jpg"
                        },
                        {
                            "value": "F638 Chromix Silver",
                            "img": "erger/F638 Chromix Silver.jpg"
                        },
                        {
                            "value": "H1180 Natural Halifax Oak",
                            "img": "erger/H1180 Natural Halifax Oak.jpg"
                        },
                        {
                            "value": "H1210 Grey-Beige Tossini Elm",
                            "img": "erger/H1210 Grey-Beige Tossini Elm.jpg"
                        },
                        {
                            "value": "H1222 Fox Grey Tossini Elm",
                            "img": "erger/H1222 Fox Grey Tossini Elm.jpg"
                        },
                        {
                            "value": "H1288 Stone Grey Frozen Wood",
                            "img": "erger/H1288 Stone Grey Frozen Wood.jpg"
                        },
                        {
                            "value": "H1290 White Frozen Wood",
                            "img": "erger/H1290 White Frozen Wood.jpg"
                        },
                        {
                            "value": "H1292 Carbon Frozen Wood",
                            "img": "erger/H1292 Carbon Frozen Wood.jpg"
                        },
                        {
                            "value": "H1367 Light Natural Casella",
                            "img": "erger/H1367 Light Natural Casella.jpg"
                        },
                        {
                            "value": "H1384 White Casella Oak",
                            "img": "erger/H1384 White Casella Oak.jpg"
                        },
                        {
                            "value": "H1701 White Tossini Elm",
                            "img": "erger/H1701 White Tossini Elm.jpg"
                        },
                        {
                            "value": "H1714 Lincoln Walnut",
                            "img": "erger/H1714 Lincoln Walnut.jpg"
                        },
                        {
                            "value": "H1815 Hardrock Maple",
                            "img": "erger/H1815 Hardrock Maple.jpg"
                        },
                        {
                            "value": "H3078 White Havana Pine",
                            "img": "erger/H3078 White Havana Pine.jpg"
                        },
                        {
                            "value": "H3081 Black Havana Pine",
                            "img": "erger/H3081 Black Havana Pine.jpg"
                        },
                        {
                            "value": "H3157 Vicenza Oak",
                            "img": "erger/H3157 Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3158 Grey Vicenza Oak",
                            "img": "erger/H3158 Grey Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3165 Light Vicenza Oak",
                            "img": "erger/H3165 Light Vicenza Oak.jpg"
                        },
                        {
                            "value": "H3171 Oiled Kendal Oak",
                            "img": "erger/H3171 Oiled Kendal Oak.jpg"
                        },
                        {
                            "value": "H3195 White Fineline",
                            "img": "erger/H3195 White Fineline.jpg"
                        },
                        {
                            "value": "H3790 Honey Carini Walnut",
                            "img": "erger/H3790 Honey Carini Walnut.jpg"
                        },
                        {
                            "value": "H3791 Carini Auburn Walnut",
                            "img": "erger/H3791 Carini Auburn Walnut.jpg"
                        },
                        {
                            "value": "H3794 Chocolate Carini Walnut",
                            "img": "erger/H3794 Chocolate Carini Walnut.jpg"
                        },
                        {
                            "value": "U201 Pebble Grey",
                            "img": "erger/U201 Pebble Grey.jpg"
                        },
                        {
                            "value": "U502 Misty Blue",
                            "img": "erger/U502 Misty Blue.jpg"
                        },
                        {
                            "value": "U702 Cashmere Grey",
                            "img": "erger/U702 Cashmere Grey.jpg"
                        },
                        {
                            "value": "U705 Angora Grey",
                            "img": "erger/U705 Angora Grey.jpg"
                        },
                        {
                            "value": "U727 Stone Grey",
                            "img": "erger/U727 Stone Grey.jpg"
                        },
                        {
                            "value": "U765 Silver Grey",
                            "img": "erger/U765 Silver Grey.jpg"
                        },
                        {
                            "value": "U779 Fog Grey",
                            "img": "erger/U779 Fog Grey.jpg"
                        },
                        {
                            "value": "U780 Monument Grey",
                            "img": "erger/U780 Monument Grey.jpg"
                        },
                        {
                            "value": "U963 Diamond Grey",
                            "img": "erger/U963 Diamond Grey.jpg"
                        },
                        {
                            "value": "U999 ST7 Black",
                            "img": "erger/U999 ST7 Black.jpg"
                        },
                        {
                            "value": "U999 ST19 Black",
                            "img": "erger/U999 ST19 Black.jpg"
                        },
                        {
                            "value": "W960 Classic White",
                            "img": "erger/W960 Classic White.jpg"
                        },
                        {
                            "value": "W1100 ST9 Alpine White",
                            "img": "erger/W1100 ST9 Alpine White - Copy.jpg"
                        },
                        {
                            "value": "W1100 ST19 Alpine White",
                            "img": "erger/W1100 ST19 Alpine White.jpg"
                        }
                    ]
                },
                {
                    "value": "Cleaf",
                    "img": "cleaf.jpg",
                    "colors": [
                        {
                            "value": "Ares Night UB02",
                            "img": "cleaf/Ares Night UB02.jpg"
                        },
                        {
                            "value": "Cheope Total White BO73",
                            "img": "cleaf/Cheope Total White BO73.jpg"
                        },
                        {
                            "value": "Fronda Bardini S164",
                            "img": "cleaf/Fronda Bardini S164.jpg"
                        },
                        {
                            "value": "Jiometori Naoshima S191",
                            "img": "cleaf/Jiometori Naoshima S191.jpg"
                        },
                        {
                            "value": "Jiometori Teshima S192",
                            "img": "cleaf/Jiometori Teshima S192.jpg"
                        },
                        {
                            "value": "Matrix Bianco BO11",
                            "img": "cleaf/Matrix Bianco BO11.jpg"
                        },
                        {
                            "value": "Matrix Carbone LM08",
                            "img": "cleaf/Matrix Carbone LM08.jpg"
                        },
                        {
                            "value": "Matrix Vineyard Oak LN30",
                            "img": "cleaf/Matrix Vineyard Oak LN30.jpg"
                        },
                        {
                            "value": "Okobo Meguro S160",
                            "img": "cleaf/Okobo Meguro S160.jpg"
                        },
                        {
                            "value": "Okobo Nakano S162",
                            "img": "cleaf/Okobo Nakano S162.jpg"
                        },
                        {
                            "value": "Poro Noce Acerno LS14",
                            "img": "cleaf/Poro Noce Acerno LS14.jpg"
                        },
                        {
                            "value": "Poro Noce Giffoni LS13",
                            "img": "cleaf/Poro Noce Giffoni LS13.jpg"
                        },
                        {
                            "value": "Primofiore Bianco BO11",
                            "img": "cleaf/Primofiore Bianco BO11.jpg"
                        },
                        {
                            "value": "Primofiore Maya Bronze FA33",
                            "img": "cleaf/Primofiore Maya Bronze FA33.jpg"
                        },
                        {
                            "value": "Sable Ascari LR25",
                            "img": "cleaf/Sable Ascari LR25.jpg"
                        },
                        {
                            "value": "Sherwood Brolio Oak LR09",
                            "img": "cleaf/Sherwood Brolio Oak LR09.jpg"
                        },
                        {
                            "value": "Sherwood Gavi Oak LN66",
                            "img": "cleaf/Sherwood Gavi Oak LN66.jpg"
                        },
                        {
                            "value": "Sherwood Toasted Espresso SO71",
                            "img": "cleaf/Sherwood Toasted Espresso SO71.jpg"
                        },
                        {
                            "value": "Yosemite Cypress Point SO13",
                            "img": "cleaf/Yosemite Cypress Point SO13.jpg"
                        }
                    ]
                },
                {
                    "value": "OneSkin",
                    "img": "oneSkin.jpg",
                    "colors": [
                        {
                            "value": "Black HG",
                            "img": "oneSkin/Black HG.jpg"
                        },
                        {
                            "value": "Black Oak HG",
                            "img": "oneSkin/Black Oak HG.jpg"
                        },
                        {
                            "value": "Black Oak SM",
                            "img": "oneSkin/Black Oak SM.jpg"
                        },
                        {
                            "value": "Black SM",
                            "img": "oneSkin/Black SM.jpg"
                        },
                        {
                            "value": "Carbon Oak HG",
                            "img": "oneSkin/Carbon Oak HG.jpg"
                        },
                        {
                            "value": "Carbon Oak SM",
                            "img": "oneSkin/Carbon Oak SM.jpg"
                        },
                        {
                            "value": "Cashmere HG",
                            "img": "oneSkin/Cashmere HG.jpg"
                        },
                        {
                            "value": "Cashmere SM",
                            "img": "oneSkin/Cashmere SM.jpg"
                        },
                        {
                            "value": "Denim Blue HG",
                            "img": "oneSkin/Denim Blue HG.jpg"
                        },
                        {
                            "value": "Denim Blue SM",
                            "img": "oneSkin/Denim Blue SM.jpg"
                        },
                        {
                            "value": "Fossil Oak HG",
                            "img": "oneSkin/Fossil Oak HG.jpg"
                        },
                        {
                            "value": "Fossil Oak SM",
                            "img": "oneSkin/Fossil Oak SM.jpg"
                        },
                        {
                            "value": "Grey HG",
                            "img": "oneSkin/Grey HG.jpg"
                        },
                        {
                            "value": "Grey SM",
                            "img": "oneSkin/Grey SM.jpg"
                        },
                        {
                            "value": "Lava Grey HG",
                            "img": "oneSkin/Lava Grey HG.jpg"
                        },
                        {
                            "value": "Lava Grey SM",
                            "img": "oneSkin/Lava Grey SM.jpg"
                        },
                        {
                            "value": "Light Grey HG",
                            "img": "oneSkin/Light Grey HG.jpg"
                        },
                        {
                            "value": "Light Grey SM",
                            "img": "oneSkin/Light Grey SM.jpg"
                        },
                        {
                            "value": "Light Walnut HG",
                            "img": "oneSkin/Light Walnut HG.jpg"
                        },
                        {
                            "value": "Light Walnut SM",
                            "img": "oneSkin/Light Walnut SM.jpg"
                        },
                        {
                            "value": "Natural Cement HG",
                            "img": "oneSkin/Natural Cement HG.jpg"
                        },
                        {
                            "value": "Natural Cement SM",
                            "img": "oneSkin/Natural Cement SM.jpg"
                        },
                        {
                            "value": "Natural Oak HG",
                            "img": "oneSkin/Natural Oak HG.jpg"
                        },
                        {
                            "value": "Natural Oak SM",
                            "img": "oneSkin/Natural Oak SM.jpg"
                        },
                        {
                            "value": "Old Oak HG",
                            "img": "oneSkin/Old Oak HG.jpg"
                        },
                        {
                            "value": "Old Oak SM",
                            "img": "oneSkin/Old Oak SM.jpg"
                        },
                        {
                            "value": "Smoked Elm HG",
                            "img": "oneSkin/Smoked Elm HG.jpg"
                        },
                        {
                            "value": "Smoked Elm SM",
                            "img": "oneSkin/Smoked Elm SM.jpg"
                        },
                        {
                            "value": "Sunny White HG",
                            "img": "oneSkin/Sunny White HG.jpg"
                        },
                        {
                            "value": "Sunny White SM",
                            "img": "oneSkin/Sunny White SM.jpg"
                        },
                        {
                            "value": "Torino Oak 2 HG",
                            "img": "oneSkin/Torino Oak 2 HG.jpg"
                        },
                        {
                            "value": "Torino Oak 2 SM",
                            "img": "oneSkin/Torino Oak 2 SM.jpg"
                        },
                        {
                            "value": "Tortora HG",
                            "img": "oneSkin/Tortora HG.jpg"
                        },
                        {
                            "value": "Tortora SM",
                            "img": "oneSkin/Tortora SM.jpg"
                        },
                        {
                            "value": "White Elm HG",
                            "img": "oneSkin/White Elm HG.jpg"
                        },
                        {
                            "value": "White Elm SM",
                            "img": "oneSkin/White Elm SM.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "value": "Custom Painted",
            "img": "Doors Shaker Custom.jpg",
            "finish": [
                {
                    "value": "Slab",
                    "img": "Slab.jpg",
                    "colors": [
                        {
                            "value": "White Matte",
                            "img": "painted/White Matte.jpg"
                        },
                        {
                            "value": "Aqua Marina",
                            "img": "painted/Agua Marina.jpg"
                        },
                        {
                            "value": "Azul Indigo",
                            "img": "painted/Azul Indigo.jpg"
                        },
                        {
                            "value": "Verde Salvia",
                            "img": "painted/Verde Salvia.jpg"
                        },
                        {
                            "value": "Gris Plomo",
                            "img": "painted/Gris Plomo.jpg"
                        },
                        {
                            "value": "Antracita",
                            "img": "painted/Antracita.jpg"
                        },
                        {
                            "value": "SW 0055 Light French Gray",
                            "img": "painted/SW0055.f.jpg"
                        },
                        {
                            "value": "SW 6204 Sea Salt",
                            "img": "painted/SW6204.f.jpg"
                        },
                        {
                            "value": "SW 6211 Rainwashed",
                            "img": "painted/SW6211.f.jpg"
                        },
                        {
                            "value": "SW 6241 Aleutian",
                            "img": "painted/SW6241.f.jpg"
                        },
                        {
                            "value": "SW 6244 Naval",
                            "img": "painted/SW6244.f.jpg"
                        },
                        {
                            "value": "SW 6250 Granite Peak",
                            "img": "painted/SW6250.f.jpg"
                        },
                        {
                            "value": "SW 6253 Olympus White",
                            "img": "painted/SW6253.f.jpg"
                        },
                        {
                            "value": "SW 6254 Lazy Gray",
                            "img": "painted/SW6254.f.jpg"
                        },
                        {
                            "value": "SW 6258 Tricorn Black",
                            "img": "painted/SW6258.f.jpg"
                        },
                        {
                            "value": "SW 6385 Dover White",
                            "img": "painted/SW6385.f.jpg"
                        },
                        {
                            "value": "SW 7004 Snowbound",
                            "img": "painted/SW7004.f.jpg"
                        },
                        {
                            "value": "SW 7005 Pure White",
                            "img": "painted/SW7005.f.jpg"
                        },
                        {
                            "value": "SW 7006 Extra White",
                            "img": "painted/SW7006.f.jpg"
                        },
                        {
                            "value": "SW 7007 Ceiling Bright White",
                            "img": "painted/SW7007.f.jpg"
                        },
                        {
                            "value": "SW 7008 Alabaster",
                            "img": "painted/SW7008.f.jpg"
                        },
                        {
                            "value": "SW 7009 Pearly White",
                            "img": "painted/SW7009.f.jpg"
                        },
                        {
                            "value": "SW 7012 Creamy",
                            "img": "painted/SW7012.f.jpg"
                        },
                        {
                            "value": "SW 7014 Eider White",
                            "img": "painted/SW7014.f.jpg"
                        },
                        {
                            "value": "SW 7015 Repose Gray",
                            "img": "painted/SW7015.f.jpg"
                        },
                        {
                            "value": "SW 7016 Mindful Gray",
                            "img": "painted/SW7016.f.jpg"
                        },
                        {
                            "value": "SW 7019 Gauntlet Gray",
                            "img": "painted/SW7019.f.jpg"
                        },
                        {
                            "value": "SW 7029 Agreeable Gray",
                            "img": "painted/SW7029.f.jpg"
                        },
                        {
                            "value": "SW 7035 Aesthetic White",
                            "img": "painted/SW7035.f.jpg"
                        },
                        {
                            "value": "SW 7036 Accessible Beige",
                            "img": "painted/SW7036.f.jpg"
                        },
                        {
                            "value": "SW 7042 Shoji White",
                            "img": "painted/SW7042.f.jpg"
                        },
                        {
                            "value": "SW 7043 Worldly Gray",
                            "img": "painted/SW7043.f.jpg"
                        },
                        {
                            "value": "SW 7048 Urbane Bronze",
                            "img": "painted/SW7048.f.jpg"
                        },
                        {
                            "value": "SW 7064 Passive",
                            "img": "painted/SW7064.f.jpg"
                        },
                        {
                            "value": "SW 7069 Iron Ore",
                            "img": "painted/SW7069.f.jpg"
                        },
                        {
                            "value": "SW 7071 Gray Screen",
                            "img": "painted/SW7071.f.jpg"
                        },
                        {
                            "value": "SW 7551 Greek Villa",
                            "img": "painted/SW7551.jpg"
                        },
                        {
                            "value": "SW 7566 Westhighland White",
                            "img": "painted/SW7566.jpg"
                        },
                        {
                            "value": "SW 7602 Indigo Batik",
                            "img": "painted/SW7602.jpg"
                        },
                        {
                            "value": "SW 7631 City Loft",
                            "img": "painted/SW7631.jpg"
                        },
                        {
                            "value": "SW 7632 Modern Gray",
                            "img": "painted/SW7632.jpg"
                        },
                        {
                            "value": "SW 7636 Origami White",
                            "img": "painted/SW7636.jpg"
                        },
                        {
                            "value": "SW 7646 First Star",
                            "img": "painted/SW7646.jpg"
                        },
                        {
                            "value": "SW 7647 Crushed Ice",
                            "img": "painted/SW7647.jpg"
                        },
                        {
                            "value": "SW 7661 Reflection",
                            "img": "painted/SW7661.jpg"
                        },
                        {
                            "value": "SW 7669 Summit Gray",
                            "img": "painted/SW7669.jpg"
                        },
                        {
                            "value": "SW 7674 Peppercorn",
                            "img": "painted/SW7674.jpg"
                        },
                        {
                            "value": "SW 7730 Forestwood",
                            "img": "painted/SW7730.jpg"
                        },
                        {
                            "value": "SW 7757 High Reflective White",
                            "img": "painted/SW7757.jpg"
                        },
                        {
                            "value": "SW 9104 Woven Wicker",
                            "img": "painted/SW9104.jpg"
                        },
                        {
                            "value": "SW 9109 Natural Linen",
                            "img": "painted/SW9109.jpg"
                        },
                        {
                            "value": "SW 9130 Evergreen Fog",
                            "img": "painted/SW9130.jpg"
                        },
                        {
                            "value": "SW 9132 Acacia Haze",
                            "img": "painted/SW9132.jpg"
                        },
                        {
                            "value": "SW 9144 Moonmist",
                            "img": "painted/SW9144.jpg"
                        },
                        {
                            "value": "SW 9165 Gossamer Veil",
                            "img": "painted/SW9165.jpg"
                        },
                        {
                            "value": "SW 9166 Drift of Mist",
                            "img": "painted/SW9166.jpg"
                        }
                    ]
                },
                {
                    "value": "Frame 3/4",
                    "img": "frame0.75.jpg"
                },
                {
                    "value": "Frame 1",
                    "img": "frame1.jpg"
                },
                {
                    "value": "Frame 1 1/2",
                    "img": "frame1.5.jpg"
                },
                {
                    "value": "Frame 2",
                    "img": "frame2.jpg"
                },
                {
                    "value": "Frame 2 1/2",
                    "img": "frame2.5.jpg"
                },
                {
                    "value": "Ribbed",
                    "img": "Painted ribbed.jpg"
                }
            ]
        },
        {
            "value": "Wood ribbed doors",
            "img": "Ribbed_door.jpg",
            "is_hide": true,
            "finish": [
                {
                    "value": "Maple",
                    "img": "Maple.jpg"
                },
                {
                    "value": "Birch",
                    "img": "Birch.jpg"
                },
                {
                    "value": "White Oak",
                    "img": "White Oak.jpg",
                    // "isGrain": true
                },
                {
                    "value": "Walnut",
                    "img": "Walnut.jpg"
                },
                {
                    "value": "Clear Coat Maple",
                    "img": "Maple.jpg"
                },
                {
                    "value": "Clear Coat Birch",
                    "img": "Birch.jpg"
                },
                {
                    "value": "Clear Coat White Oak",
                    "img": "White Oak.jpg"
                },
                {
                    "value": "Clear Coat Walnut",
                    "img": "Walnut.jpg"
                }
            ]
        }
    ],
    groove: [
        {
            "value": "1/4 rounded",
            "img": "1_4 rounded.jpg",
            "label": "rounded, 1/4 slats, 1/4 grooves"
        },
        {
            "value": "1/4 squared",
            "img": "1_4 squared.jpg",
            "label": "squared, 1/4 slats, 1/4 grooves"
        },
        {
            "value": "3/4 squared",
            "img": "3_4 squared.jpg",
            "label": "squared, 3/4 slats, 1/4 grooves"
        }
    ],
    boxMaterial: [
        {
            "value": "White Melamine",
            "img": "White Melamine.jpg"
        },
        {
            "value": "Gray Melamine",
            "img": "Gray Melamine.jpg"
        },
        {
            "value": "Gray Linen Melamine",
            "img": "Grey Linen Melamine.jpg"
        },
        {
            "value": "Beige Linen Melamine",
            "img": "Beige Linen Melamine.jpg"
        },
        {
            "value": "Ash Melamine",
            "img": "ashmelamine.jpg"
        },
        {
            "value": "Walnut Melamine",
            "img": "Walnut Melamine.jpg"
        },
        {
            "value": "Brown Oak",
            "img": "Brown Oak.jpg"
        },
        {
            "value": "Ivory Woodline",
            "img": "Ivory Woodline.jpg"
        },
        {
            "value": "Sable Wood",
            "img": "Sable Wood.jpg"
        },
        {
            "value": "Grey Woodline",
            "img": "Grey Woodline.jpg"
        },
        {
            "value": "White Oak",
            "img": "White Oak.jpg"
        },
        {
            "value": "Desert Oak",
            "img": "Desert Oak.jpg"
        },
        {
            "value": "Glacier Oak",
            "img": "Glacial_Oak.jpg"
        },
        {
            "value": "Natural Plywood",
            "img": "Natural Plywood.jpg"
        },
        {
            "value": "White Plywood",
            "img": "White Plywood.jpg"
        },
        {
            "value": "Gray Plywood",
            "img": "Gray Plywood.jpg"
        },
        {
            "value": "Ultra Matte White",
            "img": "Ultra Matte White.jpg"
        },
        {
            "value": "Ultra Matte Grey",
            "img": "Ultra Matte Grey.jpg"
        },
        {
            "value": "Ultra Matte Cashmere",
            "img": "Cashmere.jpg"
        },
        {
            "value": "Ultra Matte Gris",
            "img": "UltraMatte Gris.jpg"
        },
        {
            "value": "Ultra Matte Volcano",
            "img": "UltraMatte_Volcano.jpg"
        },
        {
            "value": "White Gloss",
            "img": "White.jpg"
        }
    ],
    drawers: [
        {
            "value": "Milino",
            "img": "Milino.jpg",
            "types": [
                {
                    "value": "Same as Box Material",
                    "img": "Same as Box Material.jpg",
                    "colors": [
                        {
                            "value": "Plywood",
                            "img": "Milino Undermount Plywood.jpg"
                        },
                        {
                            "value": "Melamine",
                            "img": "Milino Undermount Melamine.jpg"
                        }
                    ]
                },
                {
                    "value": "Legrabox",
                    "img": "Legrabox.jpg",
                    "colors": [
                        {
                            "value": "Gray",
                            "img": "Milino Legrabox Gray.jpg"
                        },
                        {
                            "value": "White",
                            "img": "Milino Legrabox White.jpg"
                        },
                        {
                            "value": "LED",
                            "img": "Milino LED Legrabox.jpg"
                        }
                    ]
                },
                {
                    "value": "Dovetail",
                    "img": "Dovetail.jpg",
                    "colors": [
                        {
                            "value": "Maple",
                            "img": "Milino Dovetail Maple.jpg"
                        },
                        {
                            "value": "Walnut",
                            "img": "Milino Dovetail Walnut.jpg"
                        }
                    ]
                }
            ]
        },
        {
            "value": "BLUM",
            "img": "blum.png",
            "types": [
                {
                    "value": "Same as Box Material",
                    "img": "Same as Box Material.jpg",
                    "colors": [
                        {
                            "value": "Plywood",
                            "img": "Blum Undermount Plywood.jpg"
                        },
                        {
                            "value": "Melamine",
                            "img": "Blum Undermount Melamine.jpg"
                        }
                    ]
                },
                {
                    "value": "Legrabox",
                    "img": "Legrabox.jpg",
                    "colors": [
                        {
                            "value": "Orion Gray",
                            "img": "Blum Orion Gray.jpg"
                        },
                        {
                            "value": "Stainless Steel",
                            "img": "Blum Stainless Steel.jpg"
                        }
                    ]
                },
                {
                    "value": "Dovetail",
                    "img": "Dovetail.jpg",
                    "colors": [
                        {
                            "value": "Maple",
                            "img": "Blum Dovetail Maple.jpg"
                        },
                        {
                            "value": "Walnut",
                            "img": "Blum Dovetail Walnut.jpg"
                        }
                    ]
                }
            ]
        }
    ],
    leatherBoxMaterial: [
        {
            "value": "Milino",
            "img": "milino.jpg"
        },
        {
            "value": "Syncron",
            "img": "syncron.jpg"
        },
        {
            "value": "Luxe",
            "img": "luxe.jpg"
        },
        {
            "value": "Ultrapan PET",
            "img": "ultrapan.jpg"
        },
        {
            "value": "Zenit",
            "img": "zenit.jpg"
        },
        {
            "value": "Ultrapan Acrylic",
            "img": "ultrapan.jpg"
        }
    ],
    leatherType: [
        {
            "value": "Goya 1523",
            "img": "Goya 1523.jpg"
        },
        {
            "value": "Bright White 70300",
            "img": "Bright White 70300.jpg"
        },
        {
            "value": "White Alligator 3263",
            "img": "White Alligator 3263.jpg"
        },
        {
            "value": "Bambino 2428",
            "img": "Bambino 2428.jpg"
        },
        {
            "value": "Titanium 7694",
            "img": "Titanium 7694.jpg"
        },
        {
            "value": "Monticello Med 7043",
            "img": "Monticello Med 7043.jpg"
        },
        {
            "value": "Almond 70204",
            "img": "Almond 70204.jpg"
        },
        {
            "value": "Silver Alligator 3266",
            "img": "Silver Alligator 3266.jpg"
        },
        {
            "value": "Brown Croco 2702",
            "img": "Brown Croco 2702.jpg"
        },
        {
            "value": "Rain 3316",
            "img": "Rain 3316.jpg"
        },
        {
            "value": "Dark Graphite 7222",
            "img": "Dark Graphite 7222.jpg"
        },
        {
            "value": "Other",
            "img": "Ultra Matte White.jpg"
        }
    ],
    grain: [
        {
            "value": "Vertical",
            "img": "Vertical Grain.jpg"
        },
        {
            "value": "Horizontal (Upcharge)",
            "img": "Horizontal Grain.jpg"
        }
    ],
    golaType: [
        {
            "value": "Regular Kitchen",
            "img": "Regular Kitchen.jpg"
        },
        {
            "value": "Handless Kitchen",
            "img": "Kitchen Handless.jpg"
        },
        {
            "value": "Regular Vanity",
            "img": "Regular Vanity.jpg"
        },
        {
            "value": "Gola Vanity",
            "img": "Handless Vanity.jpg"
        }
    ],
    gola: [
        {
            "value": "Wood Gola",
            "img": "Gola Wood.jpg"
        },
        {
            "value": "Aluminum Gola",
            "img": "Gola Aluminum.jpg"
        },
        {
            "value": "Black Matte Gola",
            "img": "Gola Black.jpg"
        },
        {
            "value": "White Gloss Gola",
            "img": "Gola White.jpg"
        },
        {
            "value": "Champagne Gola",
            "img": "Gola Champagne.jpg"
        }
    ],
    rod: [
        {
            "value": "Oval Chrome (Default)",
            "img": "Oval Chrome (Default).jpg"
        },
        {
            "value": "Matte Black",
            "img": "Matte Black.jpg"
        },
        {
            "value": "Satin Brass",
            "img": "Matte Brass.jpg"
        },
        {
            "value": "Satin Chrome",
            "img": "Matte Chrome.jpg"
        },
        {
            "value": "Satin Nickel",
            "img": "Matte Nickel.jpg"
        }
    ]
} satisfies MaterialsType;