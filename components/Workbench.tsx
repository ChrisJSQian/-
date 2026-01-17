import React from 'react';
import { Bell, UserPlus, ScanLine, FileText, Calculator, ChevronRight, AlertCircle } from 'lucide-react';
import { View } from '../types';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';

interface WorkbenchProps {
  onNavigate: (view: View, params?: any) => void;
}

const data = [
  { name: 'M1', val: 30 },
  { name: 'M2', val: 45 },
  { name: 'M3', val: 25 },
  { name: 'M4', val: 60 },
  { name: 'M5', val: 80 }, // Current month
];

const Workbench: React.FC<WorkbenchProps> = ({ onNavigate }) => {
  return (
    <div className="pb-8">
      {/* Top Nav */}
      <div className="bg-white px-5 pt-12 pb-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/100/100" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          <div>
            <h2 className="font-bold text-gray-800 text-lg">早上好，张经理</h2>
            <p className="text-xs text-gray-400">今日业绩加油！</p>
          </div>
        </div>
        <div className="relative p-2">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </div>
      </div>

      <div className="px-4 space-y-6 mt-4">
        {/* Data Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">本月业绩</h3>
            <span className="text-xs text-gray-400 flex items-center">详情 <ChevronRight className="w-3 h-3" /></span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-6 mb-4 relative z-10">
            <div>
              <p className="text-xs text-gray-500 mb-1">新增客户 (人)</p>
              <p className="text-2xl font-bold text-pingan">12</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">进件报单 (笔)</p>
              <p className="text-2xl font-bold text-pingan">8</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">审批通过率</p>
              <p className="text-lg font-bold text-gray-800">85%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">放款金额 (万)</p>
              <p className="text-lg font-bold text-gray-800">145.5</p>
            </div>
          </div>

          {/* Subtle Chart Background */}
          <div className="absolute bottom-0 right-0 w-32 h-24 opacity-20 pointer-events-none">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar dataKey="val" radius={[2, 2, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? '#FC6012' : '#ddd'} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions - King Kong Area */}
        <div className="grid grid-cols-4 gap-4">
          <button onClick={() => onNavigate(View.CUSTOMER_LIST)} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
              <UserPlus className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-600 font-medium">新建客户</span>
          </button>
          
          <button onClick={() => onNavigate(View.WIZARD)} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-pingan rounded-xl flex items-center justify-center text-white shadow-lg shadow-pingan/30">
              <ScanLine className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-800 font-bold">扫一扫</span>
          </button>

          <button onClick={() => onNavigate(View.ORDER_LIST)} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-600 font-medium">订单中心</span>
          </button>

          <button onClick={() => onNavigate(View.TOOLS)} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
              <Calculator className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-600 font-medium">计算器</span>
          </button>
        </div>

        {/* To-Do List */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-gray-800 text-lg">待处理任务</h3>
            <span className="bg-pingan text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </div>

          <div className="space-y-3">
            {/* Task Item 1 */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                   <AlertCircle className="w-5 h-5 text-pingan" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">李娜 - BYD Han</h4>
                  <p className="text-xs text-gray-500 mt-1">需补充银行流水证明</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">补件任务</span>
                </div>
              </div>
              <button onClick={() => onNavigate(View.WIZARD)} className="border border-pingan text-pingan text-sm font-medium px-4 py-1.5 rounded-full hover:bg-pingan/5">
                去处理
              </button>
            </div>

             {/* Task Item 2 */}
             <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                   <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">王强 - BMW X3</h4>
                  <p className="text-xs text-gray-500 mt-1">合同待签署</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">签约任务</span>
                </div>
              </div>
              <button className="border border-pingan text-pingan text-sm font-medium px-4 py-1.5 rounded-full hover:bg-pingan/5">
                去处理
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workbench;
