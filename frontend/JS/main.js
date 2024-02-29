const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      apiUri: "http://localhost/TodoList/backend/api/",
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

      // sections: [
      //   {
      //     name: "Featured",
      //     openedView: true,
      //     tasks: [
      //       {
      //         text: "Task 1",
      //         done: false,
      //       },
      //       {
      //         text: "Task 2",
      //         done: true,
      //       },
      //       {
      //         text: "Task 3",
      //         done: false,
      //       },
      //       {
      //         text: "Task 4",
      //         done: true,
      //       },
      //       {
      //         text: "Task 5",
      //         done: false,
      //       },
      //     ],
      //   },
      //   {
      //     name: "Others",
      //     openedView: false,
      //     tasks: [
      //       {
      //         text: "Task 1",
      //         done: false,
      //       },
      //       {
      //         text: "Task 2",
      //         done: true,
      //       },
      //       {
      //         text: "Task 3",
      //         done: false,
      //       },
      //       {
      //         text: "Task 4",
      //         done: true,
      //       },
      //       {
      //         text: "Task 5",
      //         done: false,
      //       },
      //     ],
      //   },
      //   {
      //     name: "Last",
      //     openedView: true,
      //     tasks: [
      //       {
      //         text: "Task 1",
      //         done: false,
      //       },
      //       {
      //         text: "Task 2",
      //         done: true,
      //       },
      //       {
      //         text: "Task 3",
      //         done: false,
      //       },
      //       {
      //         text: "Task 4",
      //         done: true,
      //       },
      //       {
      //         text: "Task 5",
      //         done: false,
      //       },
      //     ],
      //   },
      // ],
    };
  },

  methods: {
    fetchData() {
      const endPoint = "all-tasks.php";
      axios.get(`${this.apiUri}${endPoint}`).then((res) => {
        this.sections = res.data;
      });
    },

    toggleOpenedView(section) {
      // # call API toggle-opensection
      // via section-index
      section.openedView = !section.openedView;
      this.resetTaskChangeText();
    },

    toggleTaskDone(task) {
      this.resetTaskChangeText();

      // # call API toggle-task
      // via section-index and task-index
      task.done = !task.done;
    },

    toggleTaskChangeText(task) {
      if (!task.changeText) {
        this.resetTaskChangeText();
        task.changeText = true;
        return;
      }

      task.changeText = false;
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
      const isNewSec = this.changeMode.newSection;
      const task = { ...this.newTask };
      let section;

      section = isNewSec || this.sections.length == 0 ? { ...this.newSection } : this.sections[this.changeMode.oldSectionIndex];

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

      // # call API save-task
      // via section-index = index or new, section-name, task-text
      section.tasks.push(task);
      if (isNewSec || this.sections.length == 0) this.sections.push(section);

      this.resetChangeMode();
    },

    deleteTask(section, index) {
      // # call API delete-task
      // via section-index e task-index
      section.tasks.splice(index, 1);
    },

    deleteSection(index) {
      // # call API delete-section
      // via section-index
      this.sections.splice(index, 1);
    },

    resetTaskChangeText() {
      this.sections.forEach((section) => {
        section.tasks.forEach((task) => {
          if (task.changeText) {
            task.changeText = false;
            return;
          }
        });
      });
    },
  },

  created() {
    this.fetchData();
  },
});

app.mount("#app");
