import { SignInContainer } from '@/components/auth';

async function LoginPage({ searchParams }: { searchParams: { method?: string } }) {
    const { method } = await searchParams;

    return <SignInContainer method={method} />;
}

export default LoginPage;
