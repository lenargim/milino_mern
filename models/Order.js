import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  room_name: {
    type: String
  },
  order: [
    {
      product_id: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      depth: {
        type: Number,
      },
      blind_width: {
        type: Number,
      },
      middle_section: {
        type: Number,
      },
      corner: {
        type: String,
      },
      hinge: {
        type: String,
      },
      options: {
        type: Array,
        default: [],
      },
      shelf_option: {
        type: String,
      },
      led_border: {
        type: Array,
        default: [],
      },
      led_alignment: {
        type: String,
      },
      led_indent: {
        type: String,
      },
      leather: {
        type: String,
      },
      material: {
        type: String,
      },
      glass_door: {
        type: Array,
        default: [],
      },
      glass_shelf: {
        type: String,
      },
      led_accessories: {
        led_alum_profiles: [
          {
            length: {
              type: Number,
            },
            qty: {
              type: Number,
            }
          }
        ],
        led_gola_profiles: [
          {
            length: {
              type: Number,
            },
            color: {
              type: String,
            },
            qty: {
              type: Number,
            },
          }
        ],
        door_sensor: {
          type: Number,
        },
        dimmable_remote: {
          type: Number,
        },
        transformer: {
          type: Number,
        },
      },
      door_accessories: [
        {
          value: {
            type: String,
          },
          qty: {
            type: Number,
          }
        }
      ],
      standard_door: {
        doors: [
          {
            width: {
              type: Number,
            },
            height: {
              type: Number,
            },
            qty: {
              type: Number,
            }
          }
        ],
        color: {
          type: String,
        },
      },
      standard_panels: {
        standard_panel: [
          {
            qty: {type: Number},
            name: {type: String}
          }
        ],
        shape_panel: [
          {
            qty: {type: Number},
            name: {type: String}
          }
        ],
        wtk: [
          {
            qty: {type: Number},
            name: {type: String}
          }
        ]
      },
      note: {
        type: String,
      }
    }
  ],
  total: {
    type: Number,
    required: true,
  }
}, {timestamps: true})

export default mongoose.model('Order', OrderSchema);