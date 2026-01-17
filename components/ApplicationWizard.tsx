import React, { useState, useEffect } from 'react';
import { View, WizardStep } from '../types';
import { PRODUCTS } from '../constants';
import { ChevronLeft, Camera, CheckCircle2, AlertCircle, ScanLine, Loader2, ArrowRight } from 'lucide-react';

interface WizardProps {
  onNavigate: (view: View) => void;
  onCancel: () => void;
}

const ApplicationWizard: React.FC<WizardProps> = ({ onNavigate, onCancel }) => {
  const [step, setStep] = useState<WizardStep>(WizardStep.PRODUCT);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  
  // Calculator State
  const [price, setPrice] = useState(200000);
  const [downPaymentRatio, setDownPaymentRatio] = useState(0.2);
  const [terms, setTerms] = useState(36);
  
  // OCR/Precheck State
  const [isScanning, setIsScanning] = useState(false);
  const [ocrData, setOcrData] = useState<{name: string, vin: string} | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<'approved' | 'rejected' | null>(null);

  const calculateMonthly = () => {
    const loanAmount = price * (1 - downPaymentRatio);
    // Simple mock rate calculation
    const rate = 0.045 / 12;
    const pmt = (loanAmount * rate * Math.pow(1 + rate, terms)) / (Math.pow(1 + rate, terms) - 1);
    return Math.floor(pmt);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setOcrData({ name: '张伟', vin: 'LSVFA239082***123' });
    }, 2000);
  };

  const submitPreCheck = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setCheckResult('approved');
    }, 2500);
  };

  // Render Step 1: Product & Vehicle
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">1. 选择产品</h3>
        <div className="flex overflow-x-auto space-x-3 pb-2 no-scrollbar">
          {PRODUCTS.map(p => (
            <div 
              key={p.id}
              onClick={() => setSelectedProduct(p.id)}
              className={`flex-shrink-0 w-36 p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedProduct === p.id ? 'border-pingan bg-orange-50' : 'border-gray-100 bg-white'}`}
            >
              <h4 className={`font-bold ${selectedProduct === p.id ? 'text-pingan' : 'text-gray-800'}`}>{p.name}</h4>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tags.map(t => <span key={t} className="text-[10px] bg-white border border-gray-200 px-1 rounded text-gray-500">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">2. 车辆信息</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
           {ocrData ? (
             <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-3">
               <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
               <div>
                 <p className="text-sm text-green-800 font-bold">识别成功</p>
                 <p className="text-xs text-green-700">车主: {ocrData.name}</p>
                 <p className="text-xs text-green-700">VIN: {ocrData.vin}</p>
               </div>
               <button onClick={() => setOcrData(null)} className="ml-auto text-xs text-gray-400 underline">重扫</button>
             </div>
           ) : (
             <div onClick={simulateScan} className="border-2 border-dashed border-pingan/40 bg-pingan/5 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
               {isScanning ? (
                 <Loader2 className="w-8 h-8 text-pingan animate-spin" />
               ) : (
                 <>
                  <Camera className="w-8 h-8 text-pingan mb-1" />
                  <span className="text-xs text-pingan font-medium">点击扫描行驶证/VIN码</span>
                 </>
               )}
             </div>
           )}

           <div className="space-y-3">
             <div className="border-b border-gray-100 py-2">
               <label className="text-xs text-gray-400">品牌车型</label>
               <input type="text" defaultValue={ocrData ? "Tesla Model 3" : ""} placeholder="请选择车型" className="w-full text-sm font-medium mt-1 outline-none bg-transparent" />
             </div>
             <div className="border-b border-gray-100 py-2">
               <label className="text-xs text-gray-400">车辆价格 (元)</label>
               <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full text-sm font-medium mt-1 outline-none bg-transparent" />
             </div>
           </div>
        </div>
      </div>
      
      <button 
        disabled={!selectedProduct}
        onClick={() => setStep(WizardStep.CALCULATOR)}
        className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${selectedProduct ? 'bg-pingan text-white shadow-pingan/30' : 'bg-gray-200 text-gray-400'}`}
      >
        下一步
      </button>
    </div>
  );

  // Render Step 2: Calculator
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <p className="text-gray-500 text-sm mb-1">预估月供</p>
        <div className="flex items-baseline justify-center text-pingan">
          <span className="text-xl font-bold">¥</span>
          <span className="text-5xl font-bold mx-1">{calculateMonthly().toLocaleString()}</span>
        </div>
        <div className="flex justify-between mt-6 text-sm text-gray-600 px-4">
           <div>
             <p className="text-xs text-gray-400">贷款总额</p>
             <p className="font-bold">¥{(price * (1 - downPaymentRatio)).toLocaleString()}</p>
           </div>
           <div>
             <p className="text-xs text-gray-400">首付金额</p>
             <p className="font-bold">¥{(price * downPaymentRatio).toLocaleString()}</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm space-y-6">
         <div>
           <div className="flex justify-between mb-2">
             <span className="text-sm font-bold text-gray-800">首付比例</span>
             <span className="text-sm font-bold text-pingan">{Math.round(downPaymentRatio * 100)}%</span>
           </div>
           <input 
             type="range" 
             min="0" max="0.8" step="0.1" 
             value={downPaymentRatio} 
             onChange={(e) => setDownPaymentRatio(parseFloat(e.target.value))}
             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pingan" 
           />
           <div className="flex justify-between text-xs text-gray-400 mt-1">
             <span>0%</span>
             <span>80%</span>
           </div>
         </div>

         <div>
           <div className="flex justify-between mb-2">
             <span className="text-sm font-bold text-gray-800">贷款期限</span>
           </div>
           <div className="flex gap-2">
             {[12, 24, 36, 48, 60].map(t => (
               <button 
                key={t}
                onClick={() => setTerms(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${terms === t ? 'bg-pingan text-white border-pingan' : 'bg-white text-gray-600 border-gray-200'}`}
               >
                 {t}期
               </button>
             ))}
           </div>
         </div>
      </div>

      <button onClick={() => setStep(WizardStep.PRE_CHECK)} className="w-full bg-pingan text-white py-4 rounded-xl font-bold shadow-lg shadow-pingan/30">
        生成方案并预审
      </button>
    </div>
  );

  // Render Step 3: Pre-check
  const renderStep3 = () => (
    <div className="flex flex-col items-center justify-center pt-10 px-4">
      {!checkResult ? (
        <>
          <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
            {isChecking && (
               <>
                <div className="absolute inset-0 border-4 border-pingan/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-pingan border-t-transparent rounded-full animate-spin"></div>
               </>
            )}
            {!isChecking && <div className="text-6xl">📝</div>}
            <div className={`text-4xl ${isChecking ? 'animate-pulse' : ''}`}>
               {isChecking ? '...' : ''}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {isChecking ? '智能风控审核中...' : '客户授权与预审'}
          </h3>
          <p className="text-gray-500 text-center mb-8 max-w-xs">
            {isChecking ? '系统正在分析客户征信与大数据画像，请稍候' : '请让客户扫描二维码完成征信授权'}
          </p>

          {!isChecking && (
             <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DemoAuthorization" alt="QR" className="w-32 h-32 opacity-80" />
             </div>
          )}

          {!isChecking && (
             <button onClick={submitPreCheck} className="w-full bg-pingan text-white py-4 rounded-xl font-bold shadow-lg shadow-pingan/30">
               客户已授权，提交
             </button>
          )}
        </>
      ) : (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-t-4 border-green-500 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">预审通过</h2>
            <p className="text-gray-500 mb-4">综合评分优质，建议额度</p>
            <div className="text-3xl font-bold text-pingan mb-2">15-20 <span className="text-sm">万</span></div>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 text-left">
              <p>• 征信记录良好</p>
              <p>• 负债率低于40%</p>
            </div>
          </div>
          
          <button onClick={() => setStep(WizardStep.UPLOAD)} className="w-full bg-pingan text-white py-4 rounded-xl font-bold shadow-lg shadow-pingan/30 flex items-center justify-center gap-2">
            继续进件 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );

  // Render Step 4: Upload
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex gap-2">
         <AlertCircle className="w-5 h-5 text-pingan flex-shrink-0" />
         <p className="text-xs text-orange-800">请确保照片清晰，无反光。标 * 为必传项。</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {['身份证人像面 *', '身份证国徽面 *', '银行卡', '人脸识别 *', '购车合同', '其他材料'].map((item, idx) => (
           <div key={idx} className="aspect-[4/3] bg-white border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center hover:border-pingan hover:bg-pingan/5 transition-colors cursor-pointer group">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-white">
                <Camera className="w-5 h-5 text-gray-400 group-hover:text-pingan" />
              </div>
              <span className="text-xs text-gray-500 font-medium group-hover:text-pingan">{item}</span>
           </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto">
         <button onClick={() => {
           alert("报单提交成功！");
           onNavigate(View.ORDER_LIST);
         }} className="w-full bg-pingan text-white py-4 rounded-xl font-bold shadow-lg shadow-pingan/30">
           提交正式申请
         </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pingan-bg flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center mb-4">
          <button onClick={onCancel} className="mr-3">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-9">新建报单</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between px-2">
           {[1, 2, 3, 4].map(s => (
             <div key={s} className="flex flex-col items-center relative z-10">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${step >= s ? 'bg-pingan text-white border-pingan' : 'bg-white text-gray-400 border-gray-200'}`}>
                 {s}
               </div>
               <span className={`text-[10px] mt-1 ${step >= s ? 'text-pingan font-medium' : 'text-gray-400'}`}>
                 {s === 1 ? '产品' : s === 2 ? '方案' : s === 3 ? '预审' : '材料'}
               </span>
             </div>
           ))}
           {/* Connecting Line */}
           <div className="absolute left-6 right-6 top-[78px] h-0.5 bg-gray-200 -z-0">
             <div 
               className="h-full bg-pingan transition-all duration-300" 
               style={{ width: `${((step - 1) / 3) * 100}%` }}
             ></div>
           </div>
        </div>
      </div>

      <div className="p-4 flex-1">
        {step === WizardStep.PRODUCT && renderStep1()}
        {step === WizardStep.CALCULATOR && renderStep2()}
        {step === WizardStep.PRE_CHECK && renderStep3()}
        {step === WizardStep.UPLOAD && renderStep4()}
      </div>
    </div>
  );
};

export default ApplicationWizard;
