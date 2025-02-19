type AgreementKey = 'agreeService' | 'agreePrivacy' | 'agreeEmailNews' | 'agreeWebPushNews';

export const AGREEMENT_PROPS: Array<{
    key: AgreementKey;
    label: string;
}> = [
    { key: 'agreeService', label: '서비스 이용약관 동의 (필수)' },
    { key: 'agreePrivacy', label: '개인정보 수집 및 이용 동의 (필수)' },
    { key: 'agreeEmailNews', label: '이메일 뉴스레터 구독 여부 (선택)' },
    { key: 'agreeWebPushNews', label: '웹 푸시 뉴스레터 구독 여부 (선택)' },
];
