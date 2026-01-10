import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Book Appointments",
      desc: "Schedule doctor visits quickly and easily from anywhere. Choose your preferred time slot and doctor.",
      icon: "📅",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Live Chat",
      desc: "Talk with your doctor anytime through secure messaging. Get instant responses to your health queries.",
      icon: "💬",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Secure Records",
      desc: "All your medical records are safely stored and accessible. Your privacy is our top priority.",
      icon: "🔐",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Easy Management",
      desc: "Manage all your appointments, prescriptions, and health data in one convenient dashboard.",
      icon: "📊",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Multi-Role Support",
      desc: "Seamless experience for patients, doctors, and administrators with role-based access.",
      icon: "👥",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Real-time Updates",
      desc: "Get instant notifications about appointment confirmations, cancellations, and messages.",
      icon: "🔔",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <section id="features" className="bg-white dark:bg-gray-900 py-20 px-6 md:px-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Features That Make <span className="text-blue-600 dark:text-blue-400">Healthcare Easy</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need for seamless healthcare management in one platform
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
