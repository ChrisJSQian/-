import React, { useState, useMemo } from 'react';
import { View, CustomerTag } from '../types';
import { MOCK_CUSTOMERS, MOCK_ORDERS } from '../constants';
import { Phone, MessageCircle, ChevronLeft, User, CreditCard, Clock, Plus } from 'lucide-react';

interface CustomerProfileProps {
  customerId: string | null;
  onNavigate: (view: View) => void;
  onBack: () => void;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ customerId, onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'logs'>('orders');
  
  const customer = useMemo(() => 
    MOCK_CUSTOMERS.find(c => c.id === customerId) || MOCK_CUSTOMERS[0], 
  [customerId]);

  const orders = useMemo(() => 
    MOCK_ORDERS.filter(o => o.customerId === customer.id),
  [customer]);

  return (
    <div className="min-h-screen bg-pingan-bg flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center shadow-sm z-10 sticky top-0">
        <button onClick={onBack} className="mr-3">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center pr-9">客户详情</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Customer Profile Card */}
        <div className="m-4 mt-4 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white ${customer.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                {customer.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
                  {customer.gender === 'male' ? (
                     <span className="text-blue-500 text-xs bg-blue-50 px-1.5 py-0.5 rounded">先生</span>
                  ) : (
                    <span className="text-pink-500 text-xs bg-pink-50 px-1.5 py-0.5 rounded">女士</span>
                  )}
                </div>
                <p className="text-gray-500 mt-1 font-mono">{customer.phone}</p>
                <div className="flex gap-2 mt-2">
                  {customer.tags.map(tag => (
                    <span key={tag} className={`text-[10px] px-2 py-0.5 rounded border ${
                      tag === CustomerTag.WHITELIST ? 'text-green-600 bg-green-50 border-green-200' :
                      tag === CustomerTag.REGULAR ? 'text-blue-600 bg-blue-50 border-blue-200' :
                      'text-orange-600 bg-orange-50 border-orange-200'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-pingan">
               <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Segment Control */}
        <div className="bg-white mt-2 sticky top-[80px] z-10 shadow-sm">
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 text-sm font-medium relative ${activeTab === 'orders' ? 'text-pingan' : 'text-gray-500'}`}
            >
              订单记录
              {activeTab === 'orders' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-pingan rounded-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`flex-1 py-3 text-sm font-medium relative ${activeTab === 'logs' ? 'text-pingan' : 'text-gray-500'}`}
            >
              沟通日志
              {activeTab === 'logs' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-pingan rounded-full"></div>}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {activeTab === 'orders' ? (
            <div className="space-y-4">
              {orders.length > 0 ? orders.map(order => (
                <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-50 border-dashed">
                    <span className="text-xs text-gray-400 font-mono">{order.id.split('-')[1]}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === '审批中' ? 'bg-orange-50 text-pingan' :
                      order.status === '已放款' ? 'bg-green-50 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>{order.status}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{order.vehicleModel}</h3>
                  <p className="text-sm text-gray-500">申请金额：<span className="text-gray-900 font-medium">¥{(order.amount / 10000).toFixed(1)}万</span></p>
                  <p className="text-xs text-gray-400 mt-3 text-right">{order.updateTime}</p>
                </div>
              )) : (
                <div className="text-center py-10 text-gray-400">暂无订单记录</div>
              )}
            </div>
          ) : (
            <div className="space-y-6 pl-4 border-l-2 border-gray-100 ml-2">
               {/* Log Items */}
               <div className="relative">
                 <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-200 rounded-full border-2 border-white"></div>
                 <p className="text-xs text-gray-400 mb-1">2023-10-27 15:30</p>
                 <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-gray-700">
                    <span className="font-bold text-gray-900 mr-2">[电话]</span>
                    客户对利率有疑虑，已解释“极速贷”产品的优势。
                 </div>
               </div>
               <div className="relative">
                 <div className="absolute -left-[21px] top-1 w-3 h-3 bg-pingan rounded-full border-2 border-white ring-2 ring-pingan/20"></div>
                 <p className="text-xs text-gray-400 mb-1">2023-10-27 14:00</p>
                 <div className="bg-white p-3 rounded-lg shadow-sm text-sm text-gray-700">
                    <span className="font-bold text-gray-900 mr-2">[系统]</span>
                    发起征信查询，客户已授权。
                 </div>
               </div>
               
               <button className="flex items-center justify-center w-full py-2 text-pingan text-sm font-medium border border-dashed border-pingan/30 rounded-lg mt-4 bg-pingan/5">
                 <Plus className="w-4 h-4 mr-1" /> 添加记录
               </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="bg-white p-3 pb-8 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex gap-3">
        <button className="flex flex-col items-center justify-center w-14 h-12 text-gray-500 active:text-pingan">
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px]">电话</span>
        </button>
        <button className="flex flex-col items-center justify-center w-14 h-12 text-gray-500 active:text-green-600">
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-[10px]">微信</span>
        </button>
        
        <div className="flex-1 flex gap-2">
           <button className="flex-1 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200">
             发起预审
           </button>
           <button 
             onClick={() => onNavigate(View.WIZARD)} 
             className="flex-1 bg-pingan text-white rounded-lg font-bold text-sm shadow-lg shadow-pingan/30 hover:bg-pingan-dark"
           >
             新建申请
           </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
