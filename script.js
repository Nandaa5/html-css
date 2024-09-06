// Array para armazenar as tarefas e prioridades
let dados = [];

// Função para adicionar uma nova tarefa
const adicionarTarefa = () => {
    const input = document.getElementById('task-input');
    const task = input.value.trim();

    if (task !== '') {
        const todoList = document.getElementById('todo-list');

        const newTaskItem = document.createElement('div');
        newTaskItem.classList.add('todo-item');

        // Criação do slider de prioridade
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '1';
        slider.max = '3';
        slider.value = '2';
        slider.className = 'slider';

        // Arrow function para alterar a cor e atualizar LocalStorage e SessionStorage
        slider.oninput = () => {
            alteraCorPrioridade(newTaskItem, slider.value);
            
            // Atualiza a prioridade no array dados
            const tarefaIndex = dados.findIndex(item => item.tarefa === task);
            if (tarefaIndex > -1) {
                dados[tarefaIndex].prioridade = slider.value;
                // Persistindo no LocalStorage
                localStorage.setItem('tarefas', JSON.stringify(dados));
                // Atualizando no SessionStorage
                sessionStorage.setItem('tarefa_atual', JSON.stringify(dados[tarefaIndex]));
            }
        };

        newTaskItem.innerHTML = `<span>${task}</span>`;
        newTaskItem.appendChild(slider);
        todoList.appendChild(newTaskItem);

        // Adicionando a tarefa ao array com o spread operator
        dados = [...dados, { tarefa: task, prioridade: slider.value }];
        
        // Persistindo no LocalStorage
        localStorage.setItem('tarefas', JSON.stringify(dados));
        // Persistindo a última tarefa adicionada no SessionStorage
        sessionStorage.setItem('tarefa_atual', JSON.stringify({ tarefa: task, prioridade: slider.value }));

        input.value = '';
    } else {
        alert('Por favor, insira uma tarefa válida!');
    }
}

// Função para alterar a cor da prioridade
const alteraCorPrioridade = (item, prioridade) => {
    item.className = 'todo-item'; // Remove classes de prioridade anteriores
    switch (prioridade) {
        case '1':
            item.classList.add('prioridade-baixa');
            break;
        case '2':
            item.classList.add('prioridade-media');
            break;
        case '3':
            item.classList.add('prioridade-alta');
            break;
    }
}

// Função para limpar as tarefas
const limparTarefas = () => {
    document.getElementById('todo-list').innerHTML = '';
    dados = []; // Limpa o array de dados
    localStorage.removeItem('tarefas'); // Remove as tarefas do LocalStorage
    sessionStorage.removeItem('tarefa_atual'); // Remove a última tarefa do SessionStorage
}

// Função para exibir mensagem de sucesso
const enviar = () => {
    alert('Tarefas salvas com sucesso!');
}

// Adicionar evento de envio ao formulário
document.getElementById('todo-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    adicionarTarefa(); // Adiciona a nova tarefa
});

// Carregar as tarefas ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefaAtual = JSON.parse(sessionStorage.getItem('tarefa_atual')) || null;

    tarefasSalvas.forEach(({ tarefa, prioridade }) => {
        const todoList = document.getElementById('todo-list');
        const newTaskItem = document.createElement('div');
        newTaskItem.classList.add('todo-item');

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '1';
        slider.max = '3';
        slider.value = prioridade;
        slider.className = 'slider';

        // Atualiza a prioridade e cor
        slider.oninput = () => {
            alteraCorPrioridade(newTaskItem, slider.value);

            // Atualiza a prioridade no array dados e salva no LocalStorage e SessionStorage
            const tarefaIndex = dados.findIndex(item => item.tarefa === tarefa);
            if (tarefaIndex > -1) {
                dados[tarefaIndex].prioridade = slider.value;
                localStorage.setItem('tarefas', JSON.stringify(dados));
                sessionStorage.setItem('tarefa_atual', JSON.stringify(dados[tarefaIndex]));
            }
        };

        newTaskItem.innerHTML = `<span>${tarefa}</span>`;
        newTaskItem.appendChild(slider);
        alteraCorPrioridade(newTaskItem, prioridade);
        todoList.appendChild(newTaskItem);
    });

    dados = [...tarefasSalvas];

    // Exibir a última tarefa adicionada no console
    if (tarefaAtual) {
        console.log("Última tarefa adicionada:", tarefaAtual);
    }
});
