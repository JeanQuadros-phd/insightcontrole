

export interface TicketProps{
                id: string;
                name: string;
                status: string;
                description: string;
                phone?: string;
                email?: string;
                address?: string | null;
                created_at: Date | null;
                updated_at: Date | null;
                userId: string | null;
                customerId: string | null;
}