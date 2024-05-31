import { 
    Box, 
    ButtonGroup, 
    Card, 
    CardBody, 
    CardFooter,
    Flex, 
    HStack, 
    Heading, 
    IconButton, 
    Text, 
    VStack, 
    useDisclosure 
} from "@chakra-ui/react";
import { useState } from "react";
import { ITask } from "../../@types";
import { CreateTaskModal } from "../CreateTask";
import { useTaskData } from "../../hooks/useTaskData";
import {
    FiEdit, FiCheck, FiTrash
} from "react-icons/fi";
import { CustomConfirmDialog } from "../../components/Dialog";

interface ConfirmDialogProps {
    id: number;
    title: string;
    message: string;
}

export function Home() {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const { pendingTasks, completedTasks, findAllTasks, markTaskAsDone, deleteTask } = useTaskData()
    const [confirmDialogProps, setConfirmDialogProps] = useState<ConfirmDialogProps>()
    const [task, setTask] = useState<ITask|undefined>(undefined)

    function handleCompleteTask(task: ITask) {
        markTaskAsDone(task.id)
    }

    function handleConfirmDelete(task: ITask) {
        const dialogProps: ConfirmDialogProps = {
          id: task.id,
          title: "Deletar Task",
          message: `Você tem certeza que deseja deletar a Task #${task.id} ?`,
        };
        setConfirmDialogProps(dialogProps);
        onOpen()
    }

    function TaskCard(task: ITask) {
        return (
            <Box p={4} key={task.id}>
                <Card>
                    <CardBody>
                        <Text>{`ID: ${task.id} - ${task.description}`}</Text>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup>
                            <IconButton aria-label="Editar tarefa" colorScheme="blue" icon={<FiEdit />} 
                                onClick={() => setTask(task)}
                            />
                            <IconButton aria-label="Editar tarefa" colorScheme="red" icon={<FiTrash />}
                                onClick={() => handleConfirmDelete(task)}
                            />
                            <IconButton aria-label="Editar tarefa" colorScheme="green" icon={<FiCheck />}
                                visibility={!task.completed ? "visible" : "hidden"}
                                onClick={() => handleCompleteTask(task)}
                            />
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </Box>
        );
    }

    return (
        <>
            <CustomConfirmDialog
                title={confirmDialogProps?.title || ""}
                message={confirmDialogProps?.message || ""}
                confirmButtonLabel="Deletar"
                cancelButtonLabel="Cancelar"
                onConfirm={() => deleteTask(confirmDialogProps?.id || 0)}
                isOpen={isOpen}
                onClose={onClose}
            />
            <Flex flex={1} flexDirection="column" alignItems="center" justifyContent="center">
                <Heading size='lg'>Lista de Tarefas</Heading>

                <Box mt={5} alignItems="end" width="100%">
                    <CreateTaskModal 
                        task={task} 
                        onSuccess={() => {
                            findAllTasks()
                        }}
                        onCloseModal={() => setTask(undefined)}
                    />
                </Box>

                <HStack 
                    mt={5}
                    alignItems="start"
                >
                    <Box borderRadius='12' bg='orange.500'>
                        <Heading color='white' p={5}>Tarefas Pendentes</Heading>
                        <VStack w='35vw' spacing={1} align="stretch">
                            {pendingTasks?.map(t => TaskCard(t))}
                        </VStack>
                    </Box>

                    <Box borderRadius='12' bg='green.500'>
                        <Heading color='white' p={5}>Tarefas Concluídas</Heading>
                        <VStack w='35vw' spacing={1} align="stretch">
                            {completedTasks?.map(t => TaskCard(t))}
                        </VStack>
                    </Box>
                </HStack>
            </Flex>
        </>
    )
}