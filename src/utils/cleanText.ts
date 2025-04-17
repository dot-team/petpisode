export const cleanText = (str: string) => {
    // 1. <b> 태그 제거
    const withoutBoldTags = str.replace(/<b>/g, '').replace(/<\/b>/g, '');

    // 2. HTML 엔티티 변환
    const textarea = document.createElement('textarea');
    textarea.innerHTML = withoutBoldTags;
    return textarea.value;
};
