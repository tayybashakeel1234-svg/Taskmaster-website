import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-white">

        {/* Hero Section */}
        <section className="pt-32 pb-20 text-center px-6">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            About TaskMaster
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            TaskMaster is a modern productivity platform designed to help 
            individuals and teams organize their work, manage projects efficiently, 
            and achieve more every single day. We believe productivity should be 
            simple, powerful, and accessible to everyone.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to simplify task management by providing an intuitive 
              and powerful system that removes complexity and enhances focus. 
              We aim to empower students, professionals, and teams to work smarter, 
              stay organized, and accomplish their goals without unnecessary stress.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where productivity tools are not overwhelming 
              but supportive. TaskMaster strives to become a trusted platform 
              that transforms how people plan, track, and complete their daily 
              responsibilities — making success more structured and achievable.
            </p>
          </div>

        </section>

        
         {/* Stats Section */}
        <section className="py-20 px-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">

            <div>
              <h3 className="text-4xl font-bold mb-2">10K+</h3>
              <p className="text-sm opacity-90">Active Users</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-sm opacity-90">Tasks Completed</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold mb-2">99.9%</h3>
              <p className="text-sm opacity-90">System Reliability</p>
            </div>

          </div>
        </section>


        {/* Why Choose Us */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TaskMaster?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We focus on delivering a seamless and efficient productivity 
              experience with modern design and powerful features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

            <div className="p-8 bg-blue-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Simple & Intuitive
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Clean interface designed to eliminate distractions and help 
                you focus only on what truly matters.
              </p>
            </div>

            <div className="p-8 bg-blue-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Powerful Features
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced task tracking, analytics, and collaboration tools 
                built to scale with your productivity needs.
              </p>
            </div>

            <div className="p-8 bg-blue-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your data is protected with modern security standards to 
                ensure privacy and reliability at all times.
              </p>
            </div>

          </div>
        </section>

       

      </div>
    </Layout>
  );
}