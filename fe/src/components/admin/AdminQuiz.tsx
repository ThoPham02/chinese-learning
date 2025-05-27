import { useState } from "react";
import { TestList } from "./TestList";
import { CreateTestModal } from "./CreateTestModal";
import { TestProvider } from "../../context/TestContext";

const AdminQuiz = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <TestProvider>
      <div className="container mx-auto px-4 py-8">
        <TestList onCreateTest={() => setIsCreateModalOpen(true)} />
      </div>
      <CreateTestModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </TestProvider>
  );
};

export default AdminQuiz;
