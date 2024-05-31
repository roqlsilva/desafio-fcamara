import {FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { FormModal } from "../../components/Modal/FormModal";
import { useTaskData } from "../../hooks/useTaskData";
import { ITask } from "../../@types";

interface CreateTaskModalProps {
    task?: ITask
    onCloseModal?: () => void
    onSuccess: () => void
}

export function CreateTaskModal({
    onSuccess,
    onCloseModal,
    task
}: CreateTaskModalProps) {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [taskDescription, setTaskDescription] = useState<string>("");
  const { createTask, updateTask } = useTaskData();
  const [operation, setOperation] = useState<"create" | "update">("create");
  const [error, setError] = useState<boolean>(false);

  function handleOnClose() {
    if (onCloseModal) {
      onCloseModal()
    }
    setError(false)
    onClose()
  }

  function handleSubmit() {
    if (taskDescription) {
      if (operation === "create") {
        createTask({
          description: taskDescription, 
          onSuccess: () => {
            setTaskDescription("")
            setError(false)
            handleOnClose()
            onSuccess()
          }
        })
      } else {
        updateTask({
          id: task?.id || 0,
          description: taskDescription,
          onSuccess: () => {
            setTaskDescription("")
            setError(false)
            handleOnClose()
            onSuccess()
          }
        })
      }
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (task) {
      setTaskDescription(task.description)
      setOperation("update")
      onOpen()
    } else {
      setTaskDescription("")
      setError(false)
      setOperation("create")
    }
  }, [task])

  return (
    <FormModal
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={handleOnClose}
      buttonLabel='Criar Tarefa'
      changeOperation={() => {
        setOperation("create");
      }}
      title={operation === "create" ? "Nova Tarefa" : "Atualizar Tarefa"}
      onSubmit={handleSubmit}
      content={() => (
        <FormControl isInvalid={error}>
          <FormLabel>Descrição</FormLabel>
          <Input
            value={taskDescription}
            type='text'
            maxLength={100}
            required={true}
            onChange={e => {
              const text = e.target.value
              if (text) {
                setError(false)
              } else {
                setError(true)
              }
              setTaskDescription(e.target.value)
            }}
          />
          {!error ? (
            <FormHelperText>
              Insira a descrição da tarefa
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              A descrição da tarefa é obrigatória
            </FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
}
