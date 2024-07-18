"use client";

import { Button, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export function DialogAddTask({ open, onClose, onSubmit }: { open: boolean, onClose: () => void, onSubmit: (newTaskLabel: string) => void }) {
    const [newTaskLabel, setNewTaskLabel] = useState<string>("");

    const handleSubmit = () => {
        onSubmit(newTaskLabel);
        setNewTaskLabel("");
    };

    return (
        <Modal show={open} onClose={onClose}>
            <Modal.Header>Add New Task</Modal.Header>
            <Modal.Body>
                <TextInput
                    placeholder="Enter task label"
                    value={newTaskLabel}
                    onChange={(e) => setNewTaskLabel(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer className="flex w-full justify-end">
                <Button color="gray" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}