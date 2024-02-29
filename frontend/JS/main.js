const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      apiUri: "http://localhost/TodoList/backend/api/",
      serverError: false,
      title: "My TodoList",

      changeMode: {
        addTask: false,
        newSection: false,
        oldSectionIndex: 0,
        error: {
          sectionNameInput: false,
          taskTextInput: false,
        },
      },

      newSection: {
        name: "",
        openedView: true,
        tasks: [],
      },

      newTask: {
        text: "",
        done: false,
        changeText: false,
      },

      sections: [],
    };
  },

  methods: {
    fetchData() {
      const endPoint = "all-tasks.php";
      axios
        .get(`${this.apiUri}${endPoint}`)
        .then((res) => {
          this.sections = res.data;
        })
        .catch((error) => {
          this.serverError = true;
        });
    },

    fetchOpenedView(index) {
      const endPoint = "toggle-opensection.php";
      const param = {
        "section-index": index,
      };
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios.post(`${this.apiUri}${endPoint}`, param, header).catch((error) => {
        this.serverError = true;
      });

      // fix time loading - no waiting needed
      // .then((res) => {
      //   this.sections = res.data;
      //   console.log(res.data);
      // })
    },

    fetchToggleDone(taskIndex, sectionIndex) {
      const endPoint = "toggle-task.php";
      const param = {
        "section-index": sectionIndex,
        "task-index": taskIndex,
      };
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios.post(`${this.apiUri}${endPoint}`, param, header).catch((error) => {
        this.serverError = true;
      });

      // fix time loading - no waiting needed
      // .then((res) => {
      //   this.sections = res.data;
      //   console.log(res.data);
      // })
    },

    fetchSaveTask(taskText, sectionIndex, sectionName) {
      const endPoint = "save-task.php";
      const param = {
        "task-text": taskText,
        "section-index": sectionIndex,
        "section-name": sectionName,
      };
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${this.apiUri}${endPoint}`, param, header)
        .then((res) => {
          this.sections = res.data;
        })
        .catch((error) => {
          this.serverError = true;
        });
    },

    fetchDeleteTask(sectionIndex, taskIndex) {
      const endPoint = "delete-task.php";
      const param = {
        "task-index": taskIndex,
        "section-index": sectionIndex,
      };
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${this.apiUri}${endPoint}`, param, header)
        .then((res) => {
          this.sections = res.data;
        })
        .catch((error) => {
          this.serverError = true;
        });
    },

    fetchDeleteSection(sectionIndex) {
      const endPoint = "delete-section.php";
      const param = {
        "section-index": sectionIndex,
      };
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(`${this.apiUri}${endPoint}`, param, header)
        .then((res) => {
          this.sections = res.data;
        })
        .catch((error) => {
          this.serverError = true;
        });
    },

    fetchTaskTextChange(sectionIndex, taskIndex, taskText) {
      const endPoint = "task-textchange.php";
      const param = {
        "section-index": sectionIndex,
        "task-index": taskIndex,
        "task-newtext": taskText,
      };
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios.post(`${this.apiUri}${endPoint}`, param, header).catch((error) => {
        this.serverError = true;
      });
    },

    toggleOpenedView(index) {
      this.fetchOpenedView(index);

      // fix time loading - no waiting needed
      this.sections[index].openedView = !this.sections[index].openedView;
      this.resetTaskChangeText();
    },

    toggleTaskDone(taskIndex, sectionIndex) {
      this.resetTaskChangeText();
      this.fetchToggleDone(taskIndex, sectionIndex);

      // fix time loading - no waiting needed
      this.sections[sectionIndex].tasks[taskIndex].done = !this.sections[sectionIndex].tasks[taskIndex].done;
    },

    toggleTaskChangeText(sectionIndex, taskIndex) {
      const task = this.sections[sectionIndex].tasks[taskIndex];
      if (!task.changeText) {
        this.resetTaskChangeText();
        task.changeText = true;
        return;
      }

      task.changeText = false;
      this.fetchTaskTextChange(sectionIndex, taskIndex, task.text);
    },

    toggleChangeMode() {
      this.changeMode.addTask = !this.changeMode.addTask;
    },

    toggleNewSec() {
      this.changeMode.newSection = !this.changeMode.newSection;
      this.changeMode.oldSectionIndex = 0;
      this.newSection.name = "";
    },

    resetChangeMode() {
      this.changeMode = {
        addTask: false,
        newSection: false,
        oldSectionIndex: 0,
        error: {
          sectionNameInput: false,
          taskTextInput: false,
        },
      };

      this.newSection = {
        name: "",
        openedView: true,
        tasks: [],
      };

      this.newTask = {
        text: "",
        done: false,
        changeText: false,
      };
    },

    saveNewTask() {
      const error = this.changeMode.error;
      const isNewSec = this.changeMode.newSection || this.sections.length == 0;
      const task = { ...this.newTask };
      let section;

      const sectionIndex = isNewSec ? "new" : this.changeMode.oldSectionIndex;
      section = isNewSec ? { ...this.newSection } : this.sections[sectionIndex];

      if (section.name.length == 0) {
        error.sectionNameInput = true;
        return;
      } else {
        error.sectionNameInput = false;
      }

      if (task.text.length == 0) {
        error.taskTextInput = true;
        return;
      } else {
        error.taskTextInput = false;
      }

      const taskText = task.text;
      const sectionName = section.name;

      this.fetchSaveTask(taskText, sectionIndex, sectionName);

      this.resetChangeMode();
    },

    deleteTask(sectionIndex, taskIndex) {
      this.fetchDeleteTask(sectionIndex, taskIndex);
    },

    deleteSection(sectionIndex) {
      this.fetchDeleteSection(sectionIndex);
    },

    resetTaskChangeText() {
      this.sections.forEach((section, sectionIndex) => {
        section.tasks.forEach((task, taskIndex) => {
          if (task.changeText) {
            task.changeText = false;
            this.fetchTaskTextChange(sectionIndex, taskIndex, task.text);
            return;
          }
        });
      });
    },

    refreshPage() {
      location.reload();
    },
  },

  created() {
    this.fetchData();
  },
});

app.mount("#app");
