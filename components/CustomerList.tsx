import React, { useState } from 'react';
import { View, CustomerTag } from '../types';
import { MOCK_CUSTOMERS } from '../constants';
import { Search, ChevronRight, Plus, User } from 'lucide-react';

interface CustomerListProps {
  onNavigate: (view: View, params?: any) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.includes(searchTerm) || c.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-pingan-bg pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-4">客户列表</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索姓名或手机号" 
            className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-pingan/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {filteredCustomers.map(customer => (
          <div 
            key={customer.id} 
            onClick={() => onNavigate(View.CUSTOMER_DETAIL, { customerId: customer.id })}
            className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-4">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white ${customer.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                 {customer.name[0]}
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-1">
                   <h3 className="font-bold text-gray-800">{customer.name}</h3>
                   <span className="text-xs text-gray-400 font-mono">{customer.phone}</span>
                 </div>
                 <div className="flex gap-1">
                   {customer.tags.map(tag => (
                      <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded border ${
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
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </div>
        ))}
        
        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">未找到相关客户</p>
          </div>
        )}
      </div>

      {/* FAB - Add Customer */}
      <button 
        onClick={() => {}} // Placeholder for add action
        className="fixed bottom-24 right-4 w-12 h-12 bg-pingan text-white rounded-full shadow-lg shadow-pingan/40 flex items-center justify-center active:scale-90 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CustomerList;