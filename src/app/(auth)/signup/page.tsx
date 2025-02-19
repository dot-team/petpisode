import Link from 'next/link';
import { SignupForm } from '@/components/auth';

function SignupPage() {
    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">회원가입</h1>
                <p className="text-sm text-dot-gray-dark">
                    펫피소드를 원활히 이용하기 위해 회원가입을 해주세요
                </p>
            </div>

            <SignupForm />

            <div className="flex items-center gap-2 text-sm text-center">
                <span>이미 계정이 있으신가요?</span>
                <Link className="text-sm underline" href="/login">
                    로그인
                </Link>
            </div>
        </div>
    );
}

export default SignupPage;
