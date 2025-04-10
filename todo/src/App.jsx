import { Container, Box, Typography, Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


function App() {
    const [todos, setTodos] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        fetch("/src/assets/data.json")
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const [priority, setPriority] = useState("medium");
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };
    const handleAddTodo = () => {
        if (inputValue.trim()) {
            setTodos([
                ...todos,
                { task: inputValue, priority: priority, isDone: false },
            ]);
            setInputValue("");
            setSnackbarMessage(`"${inputValue}" 할 일이 추가되었습니다.`);
            setSnackbarOpen(true);
        }
    };
    const handleToggleTodo = (index) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    py: 4,
                    width: "60%",
                    minWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "0 auto",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    fontWeight="bold"
                >
                    NEXT Todo App
                </Typography>
                <TodoForm
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleAddTodo={handleAddTodo}
                    handlePriorityChange={handlePriorityChange}
                    priority={priority}
                />
                <TodoList
                    todos={todos}
                    handleToggleTodo={handleToggleTodo}
                />
                <Snackbar 
                    open={snackbarOpen} 
                    autoHideDuration={3000} 
                    onClose={handleCloseSnackbar}                         
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}                        
                >
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                sx={{ p: 0.5 }}
                                onClick={() => setSnackbarOpen(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
}

export default App;
