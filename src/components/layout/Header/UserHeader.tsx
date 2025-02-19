'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button, Input } from '@/components';
import { LoginDialog } from '@/components/auth';
import { NAV_ITEM, URL } from '@/constants';
import { useAuth } from '@/hooks';
import { useUserStore } from '@/stores';
import Logo from '/public/images/logo.svg';

export function UserHeader() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { signOut } = useAuth();
    const { user, isUserLoading } = useUserStore();

    return (
        <header className="sticky top-0 z-50 flex justify-center w-full border-b bg-dot-white">
            <div className="container flex justify-between items-center h-16">
                <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
                    {/* Logo */}
                    <Link href={URL.HOME.link}>
                        <Image
                            src={Logo}
                            alt="Petpisode"
                            sizes="(max-width: 768px) 82px, 112px"
                            width={112}
                            height={40}
                            className="w-[82px] md:w-[112px] h-auto"
                            priority
                        />
                    </Link>

                    {/* Main Navigation */}
                    <nav className="hidden md:inline-block">
                        <ul className="flex items-center gap-6">
                            {NAV_ITEM.map(navItem => (
                                <li key={navItem.link}>
                                    <Link
                                        href={navItem.link}
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                    >
                                        {navItem.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center justify-end flex-1">
                    {/* Search */}
                    <div className="hidden md:block relative w-full max-w-[300px] px-2">
                        <Search className="absolute w-4 h-4 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />
                        <Input type="search" placeholder="검색해주세요" className="w-full pl-9" />
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="primary" size="sm">
                            구독하기
                        </Button>
                        {!isUserLoading &&
                            (user ? (
                                <Button variant="primaryOutline" size="sm" onClick={signOut}>
                                    로그아웃
                                </Button>
                            ) : (
                                <Button
                                    variant="primaryOutline"
                                    size="sm"
                                    onClick={() => setIsLoginOpen(true)}
                                >
                                    로그인
                                </Button>
                            ))}
                        <LoginDialog isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
                    </div>
                </div>
            </div>
        </header>
    );
}
