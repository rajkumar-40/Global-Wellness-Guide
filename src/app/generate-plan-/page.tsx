'use client';
import React, { useState } from 'react';

export default function HealthOsPlan() {
  const [activeTab, setActiveTab] = useState('ayurvedic');
  const [isPaid, setIsPaid] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // पेमेंट प्रोसेस हाताळणारे फंक्शन (Razorpay Integration Example)
  const handlePayment = () => {
    // १. युझरला पेमेंट गेटवेवर नेणे (Rs. 150/-)
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // तुमच्या Razorpay ची Key
      amount: 15000, // १५० रुपये (पैसे मोजणीसाठी १०० ने गुणले आहे)
      currency: 'INR',
      name: 'Global Wellness Guide',
      description: 'Complete Health Protocol PDF Download',
      handler: function (response: any) {
        if (response.razorpay_payment_id) {
          setIsPaid(true);
          setShowPaymentModal(false);
          alert('पेमेंट यशस्वी झाले! तुमची PDF डाउनलोड होत आहे.');
          window.print(); // किंवा PDF डाउनलोड लिंक ट्रिगर करणे
        }
      },
      prefill: {
        name: 'User Health OS',
      },
      theme: {
        color: '#27ae60',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      
      {/* १. आजाराचे मूळ कारण व विश्लेषण सेक्शन */}
      <div style={{ background: '#e8f8f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ color: '#16a085', marginTop: 0 }}>आजाराचे मूळ कारण व विश्लेषण (Root Cause Analysis)</h2>
        <p><b>१. हा आजार का झाला? (Why):</b> शरीरातील वात-पित्त दोषांचा बिघाड आणि चयापचय (Metabolism) मंदावल्यामुळे पेशींच्या स्तरावर सूज व टॉक्सिन्स (आम) साचले आहेत.</p>
        <p><b>२. हा कसा झाला? (How):</b> अयोग्य आहार, शिळे अन्न खाणे, पुरेशी झोप न मिळणे आणि व्यायामाचा अभाव यामुळे पचनशक्ती कमकुवत होऊन विषारी घटक सांध्यांमध्ये/रक्तात पसरले.</p>
        <p><b>३. केव्हा व कशामुळे झाला? (When):</b> गेल्या काही महिन्यांतील अनियमित जीवनशैली आणि मानसिक ताण यामुळे आजाराची सुरुवात झाली.</p>
        <p style={{ color: '#27ae60', fontWeight: 'bold' }}>✓ योग्य नैसर्गिक नियमांचे तंतोतंत पालन केल्यास हा आजार मुळापासून बरा होऊ शकतो.</p>
      </div>

      {/* २. उपचारांचे ४ प्रमुख टॅब्स (4 Treatment Tabs) */}
      <h3>उपचार पद्धती निवडा (Choose Treatment Method):</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('ayurvedic')} style={{ padding: '10px 15px', background: activeTab === 'ayurvedic' ? '#27ae60' : '#eee', color: activeTab === 'ayurvedic' ? '#fff' : '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>१. आयुर्वेदिक उपाय</button>
        <button onClick={() => setActiveTab('brc')} style={{ padding: '10px 15px', background: activeTab === 'brc' ? '#27ae60' : '#eee', color: activeTab === 'brc' ? '#fff' : '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>२. Dr. BRC DIP Diet</button>
        <button onClick={() => setActiveTab('homeopathy')} style={{ padding: '10px 15px', background: activeTab === 'homeopathy' ? '#27ae60' : '#eee', color: activeTab === 'homeopathy' ? '#fff' : '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>३. होमिओपॅथी उपाय</button>
        <button onClick={() => setActiveTab('home')} style={{ padding: '10px 15px', background: activeTab === 'home' ? '#27ae60' : '#eee', color: activeTab === 'home' ? '#fff' : '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>४. घरगुती उपाय</button>
      </div>

      {/* ३. टॅबनुसार कंटेंट डिस्प्ले */}
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fff' }}>
        {activeTab === 'ayurvedic' && <div><h4>आयुर्वेदिक औषध व काढा वेळापत्रक</h4><p>सकाळी: च्यवनप्राश + कोमट पाणी. रात्री: अश्वगंधा वटी.</p></div>}
        {activeTab === 'brc' && <div><h4>Dr. BRC DIP Diet प्लान</h4><p>१२ वाजेपर्यंत फळे (वजन × १०g), दुपारी कच्च्या भाज्या + जेवण.</p></div>}
        {activeTab === 'homeopathy' && <div><h4>वैकल्पिक होमिओपॅथी औषधी</h4><p>Rhus Tox 30C आणि Avena Sativa Q डोस.</p></div>}
        {activeTab === 'home' && <div><h4>घरगुती आणि नॅचरोपॅथी उपाय</h4><p>सुंठ-हळदीचा काढा, सूर्यप्रकाश व तेल मालिश.</p></div>}
      </div>

      {/* ४. डाऊनलोड व पेमेंट बटण (Download Button & Rs. 150 Fee) */}
      <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3>संपूर्ण उपचार योजना PDF डाऊनलोड व प्रिंटींग चार्ज: ₹१५०/-</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>हा संपूर्ण रिपोर्ट डाउनलोड करण्यासाठी आणि प्रिंट प्रत मिळवण्यासाठी ₹१५० शुल्क जमा करा.</p>
        <button 
          onClick={() => setShowPaymentModal(true)} 
          style={{ padding: '12px 25px', background: '#e67e22', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          ₹ १५०/- भरा आणि रिपोर्ट PDF डाऊनलोड करा
        </button>
      </div>

      {/* ५. पेमेंट पॉपअप मोडल (Payment Modal Popup) */}
      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', textAlignment: 'center', maxWidth: '400px', width: '100%' }}>
            <h2>सुरक्षित पेमेंट (Secure Payment)</h2>
            <p>संपूर्ण हेल्थ प्रोटोकॉल फाईल डाउनलोड करण्यासाठी <b>₹ १५०/-</b> भरणा करा.</p>
            <button onClick={handlePayment} style={{ width: '100%', padding: '10px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', marginBottom: '10px' }}>
              UPI / Razorpay ने ₹१५० द्या
            </button>
            <button onClick={() => setShowPaymentModal(false)} style={{ width: '100%', padding: '8px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>रद्द करा (Cancel)</button>
          </div>
        </div>
      )}

    </div>
  );
}
