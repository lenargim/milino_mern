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
      led: {
        alum_profiles: [
          {
            length: {
              type: Number,
            },
            qty: {
              type: Number,
            }
          }
        ],
        gola_profiles: [
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
        transformer_60_W: {
          type: Number,
        },
        transformer_100_W: {
          type: Number,
        },
        remote_control: {
          type: Number,
        },
        door_sensor_single: {
          type: Number,
        },
        door_sensor_double: {
          type: Number,
        },
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
      closet: {
        type: String
      }
    },
    standard_doors: [
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
    rta_closet: [
      {
        qty: {type: Number},
        name: {type: String},
        width: {type: Number}
      }
    ],
    groove: {
      style: {
        type: String,
      },
      clear_coat: {
        type: Boolean
      }
    },
    drawer_inserts: {
      box_type: {
        type: String
      },
      color: {
        type: String
      },
      insert_type: {
        type: String
      },
    },
    jewelery_inserts: {
      type: Array,
      default: [],
    }
  },
  note: {
    type: String,
  }
})

export default mongoose.model('Cart', CartSchema);