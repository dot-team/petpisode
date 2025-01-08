import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { NAV_ITEM } from '@/constants';

export function UserHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background flex justify-center">
            <div className="container flex h-16 items-center">
                <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
                    {/* Logo */}
                    <Link href="/">
                        <Image src="/images/logo.svg" width={112} height={40} alt="Petpisode" />
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

                {/* Search */}
                <div className="flex flex-1 items-center justify-center px-4">
                    <div className="relative w-full max-w-[500px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="search" placeholder="검색해주세요" className="w-full pl-9" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="primary" size="sm">
                        구독하기
                    </Button>
                    <Button variant="outline" size="sm">
                        로그인
                    </Button>
                </div>
            </div>
        </header>
    );
}
