import mongoose from "mongoose";

const GlassSchema = new mongoose.Schema({
  door: {
    type: [mongoose.Schema.Types.Mixed],
    default: undefined,
  },
  shelf: {
    type: String,
    set: v => v === "" ? undefined : v
  }
}, { _id: false });

const AlumProfileSchema = new mongoose.Schema({
  length: Number,
  qty: Number
}, {_id: false});

const GolaProfileSchema = new mongoose.Schema({
  length: Number,
  color: String,
  qty: Number
}, {_id: false});

const DoorAccessorySchema = new mongoose.Schema({
  value: String,
  qty: Number
}, {_id: false});

const StandardItemSchema = new mongoose.Schema({
  qty: Number,
  name: String
}, {_id: false});

const DoorSizeSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  qty: Number
}, {_id: false});

const RtaClosetSchema = new mongoose.Schema({
  qty: Number,
  name: String,
  width: Number
}, {_id: false});

const HingesOrHolesSchema = new mongoose.Schema({
  type: String,
  top: Number,
  bottom: Number
}, { _id: false });

const CutoutSchema = new mongoose.Schema({
  width: Number,
  height: Number
}, { _id: false });

const PanelAccessoriesSchema = new mongoose.Schema({
  hinges_or_holes: {
    type: HingesOrHolesSchema,
    default: undefined
  },
  cutout: {
    type: CutoutSchema,
    default: undefined
  }
}, { _id: false });

const AccessoriesSchema = new mongoose.Schema({
  led: {
    type: {
      alum_profiles: {
        type: [AlumProfileSchema],
        default: undefined
      },
      gola_profiles: {
        type: [GolaProfileSchema],
        default: undefined
      },
      transformer_60_W: Number,
      transformer_100_W: Number,
      remote_control: Number,
      door_sensor_single: Number,
      door_sensor_double: Number
    },
    default: undefined
  },

  door: {
    type: [DoorAccessorySchema],
    default: undefined
  },

  closet: String

}, {_id: false});

const StandardPanelsSchema = new mongoose.Schema({
  standard_panel: {
    type: [StandardItemSchema],
    default: undefined
  },
  shape_panel: {
    type: [StandardItemSchema],
    default: undefined
  },
  wtk: {
    type: [StandardItemSchema],
    default: undefined
  },
  crown_molding: Number
}, {_id: false});

const DrawerAccessoriesSchema = new mongoose.Schema({
  inserts: {
    type: {
      box_type: String,
      color: String,
      insert_type: String,
    },
    default: undefined
  },
  drawer_ro: String
}, {_id: false});

const GrooveSchema = new mongoose.Schema({
  style: String,
  clear_coat: Boolean
}, {_id: false});

const CustomSchema = new mongoose.Schema({
  material: String,
  accessories: {
    type: AccessoriesSchema,
    default: undefined
  },
  standard_doors: {
    type: [DoorSizeSchema],
    default: undefined
  },
  standard_panels: {
    type: StandardPanelsSchema,
    default: undefined
  },
  rta_closet: {
    type: [RtaClosetSchema],
    default: undefined
  },
  groove: {
    type: GrooveSchema,
    default: undefined
  },
  drawer_accessories: {
    type: DrawerAccessoriesSchema,
    default: undefined
  },
  jewelery_inserts: {
    type: Array,
    default: undefined
  },
  mechanism: String,
  panel_accessories: {
    type: PanelAccessoriesSchema,
    default: undefined
  },
  extra_rollouts: Number
}, {
  _id: false
});


const LedSchema = new mongoose.Schema({
  border: {
    type: Array,
    default: undefined
  },
  alignment: String,
  indent: String
}, { _id: false });




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
    type: GlassSchema,
    default: undefined
  } ,
  led: {
    type: LedSchema,
    default: undefined,
  },
  sink: {
    type: {
      farm_height: {
        type: Number,
      }
    },
    default: undefined,
  },
  custom: {
    type: CustomSchema,
    default: undefined,
  },
  note: {
    type: String,
  }
}, {
  versionKey: false,
  minimize: true,
})


export default mongoose.model('Cart', CartSchema);