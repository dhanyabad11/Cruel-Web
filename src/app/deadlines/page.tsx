import { DeadlineList } from "@/components/Dashboard/DeadlineList";

export default function DeadlinesPage() {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">All Deadlines</h1>
                <p className="text-gray-600 mt-2">Manage and track all your deadlines</p>
            </div>

            <DeadlineList deadlines={[]} />
        </div>
    );
}
