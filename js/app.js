document.addEventListener('DOMContentLoaded', () => {
    
    // Auto-select product from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    const productSelect = document.getElementById('product');
    
    if (productParam && productSelect) {
        productSelect.value = productParam;
    }

    // Random Number Generator Logic
    const phoneInput = document.getElementById('phone');
    const generateBtn = document.getElementById('generateBtn');
    const codeDisplay = document.getElementById('codeDisplay');
    const codeStatus = document.getElementById('codeStatus');

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const phone = phoneInput.value;
            
            // Simple validation
            if (!phone || phone.length < 10) {
                alert('올바른 휴대폰 번호를 입력해주세요.');
                return;
            }

            // Simulate sending process
            generateBtn.disabled = true;
            generateBtn.textContent = '발송 중...';
            codeStatus.textContent = '인증번호를 생성하고 있습니다...';
            codeDisplay.textContent = '--- ---';

            setTimeout(() => {
                // Generate Random 6-digit number
                const randomCode = Math.floor(100000 + Math.random() * 900000);
                
                // Update UI
                codeDisplay.textContent = randomCode;
                codeStatus.innerHTML = `인증번호가 <strong>${phone}</strong>(으)로 발송되었습니다.<br>(시뮬레이션: 위 번호를 비밀번호로 사용하세요)`;
                
                // Reset button
                generateBtn.disabled = false;
                generateBtn.textContent = '인증번호 재발송';
            }, 1500); // 1.5s delay to feel like a network request
        });
    }

    // Order Form Submission Logic
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect data
            const name = document.getElementById('name').value;
            const product = document.getElementById('product').value;
            const quantity = document.getElementById('quantity').value;
            const generatedCode = codeDisplay.textContent;

            if (!product) {
                alert('상품을 선택해주세요.');
                return;
            }

            if (generatedCode === '--- ---' || generatedCode === '') {
                alert('먼저 휴대폰 인증번호를 받아주세요.');
                return;
            }

            // Simulate API call
            alert(`[주문 완료]\n\n이름: ${name}\n상품: ${product}\n주문 수량: ${quantity}개\n\n주문이 성공적으로 접수되었습니다!`);
            orderForm.reset();
            codeDisplay.textContent = '--- ---';
            codeStatus.textContent = '';
            generateBtn.textContent = '인증번호 받기';
        });
    }
});
