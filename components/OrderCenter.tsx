import React, { useState } from 'react';
import { View, Order, OrderStatus } from '../types';
import { MOCK_ORDERS } from '../constants';
import { ChevronLeft, Filter, Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface OrderCenterProps {
  onNavigate: (view: View) => void;
}

const OrderCenter: React.FC<OrderCenterProps> = ({ onNavigate }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Detail View
  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-pingan-bg flex flex-col">
        <div className="bg-pingan px-4 pt-12 pb-8 text-white relative">
          <button onClick={() => setSelectedOrder(null)} className="absolute top-12 left-4 text-white/80 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="mt-6 ml-2">
            <h1 className="text-2xl font-bold mb-1">{selectedOrder.status}</h1>
            <p className="text-white/80 text-sm">申请编号：{selectedOrder.id}</p>
          </div>
        </div>

        <div className="flex-1 -mt-4 bg-pingan-bg rounded-t-3xl px-4 pt-6 overflow-y-auto">
          {/* Card Info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
             <h2 className="font-bold text-lg text-gray-900">{selectedOrder.vehicleModel}</h2>
             <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">客户：{selectedOrder.customerName}</span>
                <span className="text-gray-500">金额：¥{(selectedOrder.amount/10000).toFixed(1)}万</span>
             </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-20">
             <h3 className="font-bold text-gray-800 mb-6">流程进度</h3>
             <div className="relative pl-2 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
               
               {/* Step 1: Completed */}
               <div className="relative flex gap-4">
                 <div className="w-7 h-7 bg-pingan rounded-full flex items-center justify-center z-10 shrink-0 border-4 border-white shadow-sm">
                   <CheckCircle2 className="w-4 h-4 text-white" />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm">申请提交</h4>
                   <p className="text-xs text-gray-400 mt-1">张经理 10-27 10:30</p>
                 </div>
               </div>

               {/* Step 2: Completed */}
               <div className="relative flex gap-4">
                 <div className="w-7 h-7 bg-pingan rounded-full flex items-center justify-center z-10 shrink-0 border-4 border-white shadow-sm">
                   <CheckCircle2 className="w-4 h-4 text-white" />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm">征信/大数据预审</h4>
                   <p className="text-xs text-gray-400 mt-1">系统自动 10-27 10:31</p>
                   <div className="mt-2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded inline-block">
                     通过
                   </div>
                 </div>
               </div>

               {/* Step 3: Current (Pulse) */}
               {selectedOrder.status === OrderStatus.PENDING && (
                 <div className="relative flex gap-4">
                   <div className="relative z-10 shrink-0">
                      <div className="w-7 h-7 bg-white border-4 border-pingan rounded-full z-10 relative"></div>
                      <div className="absolute inset-0 bg-pingan rounded-full animate-pulse-fast opacity-40 scale-150"></div>
                   </div>
                   <div>
                     <h4 className="font-bold text-pingan text-sm">人工风控审批</h4>
                     <p className="text-xs text-gray-400 mt-1">正在处理中...</p>
                     {selectedOrder.stagnationTime && (
                       <div className="mt-2 flex items-center gap-2">
                         <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded flex items-center gap-1">
                           <Clock className="w-3 h-3" /> {selectedOrder.stagnationTime}
                         </span>
                         <button className="text-xs bg-pingan text-white px-3 py-1 rounded-full shadow-md shadow-pingan/30 active:scale-95">
                           催办
                         </button>
                       </div>
                     )}
                   </div>
                 </div>
               )}

               {/* Step 4: Future */}
               <div className="relative flex gap-4 opacity-50">
                 <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center z-10 shrink-0 border-4 border-white">
                   <Circle className="w-4 h-4 text-gray-400" />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm">签约放款</h4>
                   <p className="text-xs text-gray-400 mt-1">待进行</p>
                 </div>
               </div>

             </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-full max-w-md bg-white p-4 border-t border-gray-100 flex gap-3 z-20">
          <button className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm">查看合同</button>
          <button className="flex-1 py-3 rounded-xl bg-pingan text-white font-bold text-sm shadow-lg shadow-pingan/30">补充材料</button>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-pingan-bg flex flex-col">
       <div className="bg-white px-4 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center mb-4">
          <button onClick={() => onNavigate(View.WORKBENCH)} className="mr-3">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-9">订单中心</h1>
        </div>
        {/* Filter Tabs */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {['全部', '审批中', '待签约', '已放款'].map((f, i) => (
            <button key={f} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3 pb-24">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} onClick={() => setSelectedOrder(order)} className="bg-white rounded-xl p-4 shadow-sm active:scale-[0.99] transition-transform">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-gray-400 font-mono">{order.id}</span>
              <span className={`text-xs px-2 py-1 rounded font-medium ${
                order.status === OrderStatus.PENDING ? 'bg-orange-50 text-pingan' :
                order.status === OrderStatus.APPROVED ? 'bg-blue-50 text-blue-600' :
                order.status === OrderStatus.COMPLETED ? 'bg-green-50 text-green-600' :
                'bg-gray-100 text-gray-500'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">{order.customerName}</h3>
              <span className="text-sm font-bold text-gray-900">¥{(order.amount / 10000).toFixed(1)}万</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{order.vehicleModel}</p>

            {order.stagnationTime && (
              <div className="bg-red-50 text-red-500 text-xs px-2 py-1.5 rounded flex items-center gap-1.5 w-fit">
                <AlertCircle className="w-3 h-3" />
                {order.stagnationTime}
              </div>
            )}
            
            {!order.stagnationTime && (
               <div className="text-xs text-gray-400 text-right">更新于 {order.updateTime}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCenter;
