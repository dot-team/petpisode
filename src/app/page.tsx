'use client';

import DialogItem from '@/components/dialog/DialogItem';

export default function Page() {
    return (
        <div>
            <h1>Home</h1>
            <DialogItem
                buttonTitle="확인"
                title="삭제하시겠습니까?"
                onSucess={() => console.log(123)}
                onCancel={() => console.log(456)}
                sucessMesage="성공"
                cancelMessage="취소"
                description=""
            />
        </div>
    );
}
