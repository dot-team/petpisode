import { EmailLogin, SocialLogin } from '@/components/auth';

async function LoginPage({ searchParams }: { searchParams: { method?: string } }) {
    const { method } = await searchParams;

    return method === 'email' ? <EmailLogin /> : <SocialLogin />;
}

export default LoginPage;
