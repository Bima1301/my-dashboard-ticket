'use client';

import useAuthStore from "@/stores/authStore";
import { Button, Datepicker, Label, Modal, Select, TextInput } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";

export function DialogAddTicket({ open, onClose, onSubmit }: { open: boolean, onClose: () => void, onSubmit: (data: any) => void }) {
    const { currentUser } = useAuthStore();
    const [label, setLabel] = useState<string>("");
    const [date, setDate] = useState<any>("");
    const [priority, setPriority] = useState<string>("low");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!label || !date || !priority) {
            toast.error("Please fill in all fields.");
            return;
        }

        const currentDate = new Date().toISOString();
        const newTicket = {
            label,
            date,
            priority: priority,
            createdAt: currentDate,
            updatedAt: currentDate,
            userId: currentUser?.id,
            userData: currentUser
        };
        onSubmit(newTicket);
        onClose(); // Close the dialog after submission
    };

    return (
        <Modal show={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <Modal.Header>Add New Ticket</Modal.Header>
                <Modal.Body className="flex flex-col h-full">
                    <div className="mb-3 block">
                        <Label value="Ticket Label" />
                        <TextInput
                            placeholder="Enter ticket label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 block">
                        <Label value="Date" />
                        <Datepicker
                            placeholder="Select date"
                            value={date ? moment(date).format("YYYY-MM-DD") : ""}
                            onSelectedDateChanged={(e: Date) => setDate(moment(e).toISOString())}
                        />
                    </div>

                    <div className="mb-3 block">
                        <Label value="Priority" />
                        <Select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="low" selected>Low</option>
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                        </Select>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex w-full justify-end">
                    <Button color="gray" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
