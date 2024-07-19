'use client';

import useAuthStore from "@/stores/authStore";
import { Button, Datepicker, Label, Modal, Select, TextInput } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function DialogEditTicket({ open, onClose, onSubmit, values }: { open: boolean, onClose: () => void, onSubmit: (data: any) => void, values: any }) {
    const { currentUser } = useAuthStore();
    const [label, setLabel] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [priority, setPriority] = useState<string>("");

    // Initialize form fields when values change
    useEffect(() => {
        if (values) {
            setLabel(values.label || "");
            setDate(values.date ? moment(values.date).format("YYYY-MM-DD") : "");
            setPriority(values.priority || "low");
        }
    }, [values]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!label || !date || !priority) {
            toast.error("Please fill in all fields.");
            return;
        }

        const updatedTicket = {
            ...values, // Retain existing ticket data
            label,
            date,
            priority,
            updatedAt: new Date().toISOString(),
            userId: currentUser?.id,
            userData: currentUser
        };
        onSubmit(updatedTicket);
        onClose();
    };

    return (
        <Modal show={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <Modal.Header>Edit Ticket</Modal.Header>
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
                            <option value="low">Low</option>
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
