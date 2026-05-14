import mongoose, { Schema, Document, Model } from "mongoose";
import { tourPackageSchema } from "@/src/zodSchema/packageSchema";
import {z} from 'zod'

// interface Itinerary {
  
//   id: string;
//   day: number;
//   title: string;
//   description: string;

// }

// interface FAQ {
//   id: string;
//   question: string;
//   answer: string;
// }

// interface Duration {
//   id: string;
//   days: string;
//   place: string;
// }

// interface Testimonial {
//   id: string;
//   name: string;
//   description: string;
//   rating: string;
// }

// interface RouteSegment {
//   id: string;
//   from: string;
//   to: string;
// }

// interface RouteType {
//   source: string;
//   destination: string;
//   segments: RouteSegment[];
// }

// interface TextItem {
//   id: string;
//   description: string;
// }

// interface ChildImage {
//   id: string;
//   image: string;
//   alt: string;
// }

// interface KnowBeforeYouGo {
//    id : string;
//    description : string;
// }



// export interface ITourPackage extends Document {
//   title: string;
//   slug: string;
//   category: string;
//   price: number;
//   rating: string;
//   reviews : string;

//   duration: string;
//   status: string;

//   days: number;
//   nights: number;

//   durationbreakdown: Duration[];

//   destination: string;
//   overview?: string;

//   highlights: TextItem[];
//   itinerary: Itinerary[];

//   inclusions: TextItem[];
//   exclusions: TextItem[];

//   knowBeforeYouGo : KnowBeforeYouGo[];

//   faqs: FAQ[];

//   metaTitle?: string;
//   metaDescription?: string;

//   schemaTitle?: string;
//   schemaDescription?: string;

//   refund?: string;
//   cancel?: string;
//   confirmation?: string;
//   payment?: string;

//   heroImage?: {alt : string, image : string};

//   childImages: ChildImage[];

//   testimonials: Testimonial[];

//   documents: TextItem[];

//   routes: RouteType;

//   isTransferIncluded: boolean;
//   isStayIncluded: boolean;
//   isBreakfastIncluded: boolean;
//   isSightseeingIncluded: boolean;
//   availableSrc : string[];

//   createdAt: Date;
//   updatedAt: Date;

// }

export type ITourPackage = z.infer<typeof tourPackageSchema>;





const TourPackageSchema: Schema<ITourPackage> = new Schema(
  {
    title: { type: String, required : true, trim: true },

    slug: { type: String ,rquirerd : true, unique: true },

    duration: { type: String, required: function () : boolean {
            return this.status === "published";
          }
     },

    category: { type: String,  required : function () : boolean {
            return this.status === "published";
          } },

    price: { type: Number, required : function () : boolean {
            return this.status === "published";
          }, min: 0 },

    rating: { type: Number, required : function () : boolean {
            return this.status === "published";
          }},

    reviews : {type : Number ,required : function () : boolean {
            return this.status === "published";
          }},

    status: { type: String, required : function () : boolean {
            return this.status === "published";
          }},

    days: { type: Number, required : function () : boolean {
            return this.status === "published";
          } },
    nights: { type: Number,required : function () : boolean {
            return this.status === "published";
          }},

    durationbreakdown: [
      {
        id: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        days: { type: Number, required : function () : boolean {
            return this.status === "published";
          } },
        place: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
      },
    ],
    availableSrc : [
       {
        type : String, required : function() : boolean {
            return  this.status === 'published';
        }
       }
    ],

    destination: { type: String, required : function () : boolean {
            return this.status === "published";
          }, index: true },

    overview: { type: String },

    highlights: [
      {
        id: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        description: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
      },
    ],

    itinerary: [
      {
        id: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        day: { type: Number, required : function () : boolean {
            return this.status === "published";
          } },
        title: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        description: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
      },
    ],

    inclusions: [
      {
        id: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        description: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
      },
    ],

    exclusions: [
      {
        id: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        description: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
      },
    ],

    faqs: [
      {
        id: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        question: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        answer: { type: String, required :  function () : boolean {
            return this.status === "published";
          } },
      },
    ],

    metaTitle: { type: String },
    metaDescription: { type: String },

    schemaTitle: { type: String },
    schemaDescription: { type: String },

    refund: { type: String },
    cancel: { type: String },
    confirmation: { type: String },
    payment: { type: String },

    heroImage: { alt : {type : String} , image : {type : String} },


    childImages: [
      {
        id: { type: String, default : "" },
        image: { type: String, default : "" },
        alt: { type: String, deafault : "" },
      },
    ],

    testimonials: [
      {
        id: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        name: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        description: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        rating: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
      },
    ],

    knowBeforeYouGo : [
      {
        id: { type: String,  required : function () : boolean {
            return this.status === "published";
          } },
        description: { type: String,required :  function () : boolean {
            return this.status === "published";
          } },
      },
    ],

    routes: 
      {
        source: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        destination: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
        segments: [
          {
            id: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
            from: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
            to: { type: String, required : function () : boolean {
            return this.status === "published";
          } },
          },
        ],
      },
    

    isTransferIncluded: { type: Boolean, default: false },
    isStayIncluded: { type: Boolean, default: false },
    isBreakfastIncluded: { type: Boolean, default: false },
    isSightseeingIncluded: { type: Boolean, default: false },
  },
  { timestamps: true }
);



const TourPackageModel: Model<ITourPackage> =
  mongoose.models.Packages ||
  mongoose.model<ITourPackage>("Packages", TourPackageSchema);

export default TourPackageModel;