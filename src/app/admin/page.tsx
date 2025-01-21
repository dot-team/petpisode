'use client';

import { DetailViewContainer } from '@/components/AdminViewContainer';
import { FormContainer } from '@/components/AdminFormContainer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function page() {
    // Example detail view
    const detailItems = [
        {
            label: 'Date of birth',
            content: '커뮤니티라라라라 커뮤니티라라라라커뮤니티라라라라커뮤니티라라라라',
        },
        {
            label: 'Framework',
            content: '커뮤니티라라라라',
        },
        {
            label: 'Description',
            content:
                '커뮤니티라라라라 커뮤니티라라라라커뮤니티라라라라커뮤니티라라라라 커뮤니티라라라라 커뮤니티라라라라커뮤니티라라라라커뮤니티라라라라',
        },
    ];

    return (
        <div className="space-y-10 p-6">
            {/* Detail View Example */}
            <DetailViewContainer
                title="커뮤니티 상세"
                items={detailItems}
                onCancel={() => console.log('Cancel clicked')}
                onSubmit={() => console.log('Submit clicked')}
            />

            {/* Form Example */}
            <FormContainer
                title="커뮤니티 등록/수정"
                onCancel={() => console.log('Cancel clicked')}
                onSubmit={() => console.log('Submit clicked')}
            >
                <div className="grid gap-1.5">
                    <Label htmlFor="date">Date of birth</Label>
                    <Input id="date" placeholder="Name of your project" />
                </div>

                <div className="grid gap-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                        <SelectTrigger id="framework">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="react">React</SelectItem>
                            <SelectItem value="vue">Vue</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Type your message here."
                        className="min-h-[150px]"
                    />
                </div>
            </FormContainer>
        </div>
    );
}
