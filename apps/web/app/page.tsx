import { Geolocation, RescueButton } from "@/components";

export default function Page() {
  return (
    <div className="w-full max-w-md mx-auto p-6 flex flex-col justify-center min-h-screen space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          {/* Animated Circles Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-2 border-primary-200 dark:border-primary-800 animate-pulse opacity-20"></div>
            <div className="absolute w-60 h-60 rounded-full border border-primary-100 dark:border-primary-900 animate-spin opacity-10"></div>
          </div>
          
          {/* Location Icon */}
          <div className="relative z-10 flex justify-center">
            <div className="p-6 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-full shadow-2xl">
              <Geolocation className="w-20 h-20 text-white" />
            </div>
          </div>
        </div>
        
        {/* Title and Description */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gradient">
            긴급구조 위치공유
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            조난자에게 링크를 보내<br />
            실시간 위치를 추적하세요
          </p>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="space-y-4">
        <RescueButton />
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          생성된 링크는 24시간 후 자동 삭제됩니다
        </p>
      </div>
    </div>
  );
}