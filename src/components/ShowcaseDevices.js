// "use client";
// import { motion } from "framer-motion";

// export default function ShowcaseDevices() {
//   return (
//     <section className="relative py-32 bg-gradient-to-b from-white to-blue-50 overflow-hidden">

//       {/* Background Glow */}
//       <div className="absolute inset-0 flex justify-center">
//         <div className="w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 text-center">

//         <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
//           Manage Everything.
//           <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//             Anywhere. Anytime.
//           </span>
//         </h2>

//         <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
//           TaskMaster works seamlessly across all your devices —
//           desktop, tablet and mobile.
//         </p>

//         {/* Devices Wrapper */}
//         <div className="mt-20 relative flex justify-center items-end">

//           {/* Laptop */}
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="w-[700px] h-[400px] bg-black rounded-2xl shadow-2xl relative z-10"
//           >
//             <div className="absolute inset-3 bg-white rounded-xl p-6">
//               <div className="h-4 w-24 bg-blue-600 rounded mb-6"></div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div className="bg-blue-50 p-4 rounded-lg shadow">
//                   <div className="h-3 bg-blue-400 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-300 rounded w-full"></div>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-lg shadow">
//                   <div className="h-3 bg-blue-400 rounded w-2/3 mb-2"></div>
//                   <div className="h-3 bg-gray-300 rounded w-full"></div>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-lg shadow">
//                   <div className="h-3 bg-blue-400 rounded w-1/2 mb-2"></div>
//                   <div className="h-3 bg-gray-300 rounded w-full"></div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Tablet */}
//           <motion.div
//             initial={{ opacity: 0, x: -60 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="absolute left-10 bottom-0 w-[300px] h-[380px] bg-black rounded-2xl shadow-xl z-20"
//           >
//             <div className="absolute inset-3 bg-white rounded-xl p-4">
//               <div className="h-3 bg-blue-500 rounded w-1/2 mb-4"></div>
//               <div className="space-y-3">
//                 <div className="h-3 bg-gray-300 rounded"></div>
//                 <div className="h-3 bg-gray-300 rounded"></div>
//                 <div className="h-3 bg-gray-300 rounded"></div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Mobile */}
//           <motion.div
//             initial={{ opacity: 0, x: 60 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="absolute right-10 bottom-0 w-[180px] h-[360px] bg-black rounded-3xl shadow-xl z-30"
//           >
//             <div className="absolute inset-3 bg-white rounded-2xl p-4">
//               <div className="h-3 bg-blue-500 rounded w-3/4 mb-4"></div>
//               <div className="space-y-3">
//                 <div className="h-3 bg-gray-300 rounded"></div>
//                 <div className="h-3 bg-gray-300 rounded"></div>
//               </div>
//             </div>
//           </motion.div>

//         </div>

//       </div>
//     </section>
//   );
// }



"use client";
import { motion } from "framer-motion";

export default function ShowcaseDevices() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white to-blue-50 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Manage Everything.
          <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Anywhere. Anytime.
          </span>
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          TaskMaster works seamlessly across all your devices —
          desktop, tablet and mobile.
        </p>

        {/* Devices Wrapper */}
        <div className="mt-20 relative flex justify-center items-end">

          {/* Laptop */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[700px] h-[400px] bg-black rounded-2xl shadow-2xl relative z-10"
          >
            {/* Image goes here */}
            <div className="absolute inset-3 bg-white rounded-xl p-6 overflow-hidden">
              <img
                src="/laptop.png" 
                alt="Laptop Dashboard"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>

          {/* Tablet */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute left-10 bottom-0 w-[300px] h-[380px] bg-black rounded-2xl shadow-xl z-20"
          >
            <div className="absolute inset-3 bg-white rounded-xl p-4 overflow-hidden">
              <img
               src="/tablet .png"
                alt="Tablet Dashboard"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>

          {/* Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute right-10 bottom-0 w-[180px] h-[360px] bg-black rounded-3xl shadow-xl z-30"
          >
            <div className="absolute inset-3 bg-white rounded-2xl p-4 overflow-hidden">
              <img
                src="/mobile.png" 
                alt="Mobile Dashboard"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}