import React from 'react';
import { View } from '../types';
import { Settings, ChevronRight, CreditCard, BookOpen, Share2, LogOut, Calculator, Package, Headphones } from 'lucide-react';

interface MineProps {
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const Mine: React.FC<MineProps> = ({ onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-pingan-bg pb-24">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-pingan-light to-pingan px-6 pt-16 pb-12 rounded-b-[40px] shadow-lg shadow-pingan/20">
        <div className="flex items-center gap-4 text-white">
          <img src="https://picsum.photos/100/100" alt="Avatar" className="w-16 h-16 rounded-full border-2 border-white/50 shadow-md" />
          <div className="flex-1">
            <h2 className="text-xl font-bold">张经理</h2>
            <p className="text-white/80 text-sm mt-0.5">平安汽车金融 - 资深客户经理</p>
          </div>
          <Share2 className="w-6 h-6 text-white/90" />
        </div>
        
        {/* Stats */}
        <div className="flex justify-between mt-8 px-2">
          <div className="text-center">
             <p className="text-2xl font-bold text-white">12</p>
             <p className="text-xs text-white/70 mt-1">本月进件</p>
          </div>
          <div className="text-center">
             <p className="text-2xl font-bold text-white">85%</p>
             <p className="text-xs text-white/70 mt-1">批核率</p>
          </div>
          <div className="text-center">
             <p className="text-2xl font-bold text-white">Top 5</p>
             <p className="text-xs text-white/70 mt-1">区域排名</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6">
        {/* Tools Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
           <h3 className="font-bold text-gray-800 mb-4">常用工具</h3>
           <div className="grid grid-cols-4 gap-4">
             <div className="flex flex-col items-center gap-2">
               <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-pingan">
                 <Calculator className="w-5 h-5" />
               </div>
               <span className="text-xs text-gray-600">计算器</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                 <Package className="w-5 h-5" />
               </div>
               <span className="text-xs text-gray-600">产品库</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
                 <BookOpen className="w-5 h-5" />
               </div>
               <span className="text-xs text-gray-600">展业学堂</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                 <CreditCard className="w-5 h-5" />
               </div>
               <span className="text-xs text-gray-600">我的名片</span>
             </div>
           </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
           {[
             { icon: Settings, label: '系统设置' },
             { icon: Headphones, label: '帮助与反馈' }
           ].map((item, i) => (
             <div key={item.label} className={`p-4 flex items-center justify-between active:bg-gray-50 ${i !== 1 ? 'border-b border-gray-50' : ''}`}>
               <div className="flex items-center gap-3">
                 <item.icon className="w-5 h-5 text-gray-500" />
                 <span className="text-sm font-medium text-gray-700">{item.label}</span>
               </div>
               <ChevronRight className="w-4 h-4 text-gray-300" />
             </div>
           ))}
        </div>

        <button onClick={onLogout} className="w-full mt-6 bg-white border border-gray-200 text-gray-500 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:bg-gray-50">
           <LogOut className="w-4 h-4" /> 退出登录
        </button>
        
        <p className="text-center text-xs text-gray-300 mt-8 mb-4">v1.0.0 OrangeAuto Finance</p>
      </div>
    </div>
  );
};

export default Mine;