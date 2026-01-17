import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white p-8">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-20 h-20 bg-pingan/10 rounded-2xl flex items-center justify-center mb-6">
           <ShieldCheck className="w-10 h-10 text-pingan" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">平安汽车金融</h1>
        <p className="text-gray-500 mb-10">B端展业工作台</p>

        <div className="w-full space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">手机号码</label>
            <input 
              type="tel" 
              placeholder="请输入手机号"
              defaultValue="13800138000"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pingan/20 focus:border-pingan transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">验证码</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="1234"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pingan/20 focus:border-pingan transition-colors"
              />
              <button className="px-4 py-3 text-pingan font-medium bg-pingan/5 rounded-lg whitespace-nowrap">
                获取验证码
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full bg-pingan hover:bg-pingan-dark text-white font-bold py-4 rounded-xl mt-10 shadow-lg shadow-pingan/30 active:scale-[0.98] transition-all"
        >
          立即登录
        </button>
      </div>

      <div className="py-6 text-center">
        <a href="#" className="text-sm text-gray-400 hover:text-pingan">使用SSO企业账号登录</a>
      </div>
    </div>
  );
};

export default Login;
