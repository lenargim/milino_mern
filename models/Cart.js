import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  product_id: {
    type: Number,
    required: true,
  },
  product_type: {
    type: String,
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
  // shelf_option: {
  //   type: String,
  // },
  glass: {
    door: {
      type: Array,
      default: [],
    },
    shelf: {
      type: String,
    },
  },
  led: {
    border: {
      type: Array,
      default: [],
    },
    alignment: {
      type: String,
    },
    indent: {
      type: String,
    },
  },

  custom: {
    material: {
      type: String,
    },
    accessories: {
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
      led_door_sensor: {
        type: Number,
      },
      led_dimmable_remote: {
        type: Number,
      },
      led_transformer: {
        type: Number,
      },
      door: [
        {
          value: {
            type: String,
          },
          qty: {
            type: Number,
          }
        }
      ],
    },
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
      ],
      crown_molding: {
        type: Number,
      }
    },
  },

  note: {
    type: String,
  }
})

export default mongoose.model('Cart', CartSchema);