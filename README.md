# OS-Project

## Overview

Welcome to the OS-Project! This project is designed as part of an Operating Systems course to implement key OS concepts. It includes functionalities such as process scheduling, memory management, file handling, and inter-process communication.

### Visualize Paging Replacement Algorithms

One of the standout features of this project is the **visualization tool** for paging replacement algorithms. Users can interactively explore how different algorithms manage memory, including:

- **FIFO (First-In-First-Out)**: Understand how the oldest page in memory is replaced.
- **LRU (Least Recently Used)**: See how the algorithm replaces the page that hasn't been used for the longest time.
- **LFU (Least Frequently Used)**: Visualize how the page with the lowest access frequency is replaced.
- **Optimal**: Experience the theoretical best-case scenario where the page that won't be used for the longest time in the future is replaced.

This tool provides a hands-on approach to learning about memory management, making it easier to grasp complex concepts.

## Features

- Implementation of CPU scheduling algorithms (FCFS, SJF, Round Robin, etc.).
- Memory management techniques like paging and segmentation.
- **Interactive visualization of paging replacement algorithms** (FIFO, LRU, LFU, Optimal).
- Inter-process communication using shared memory and message passing.
- File system operations like read, write, and delete.
- Synchronization using semaphores and monitors.

## Getting Started

### Prerequisites

- **Operating System:** Linux/Windows (preferably Linux for system calls)
- **Compiler:** GCC/G++ (for C/C++ implementation)
- **Tools:** Makefile, CMake (if applicable)

### Installation

Clone the repository and navigate to the project directory:

```sh
git clone https://github.com/TusharChauhan09/OS-Project.git
cd OS-Project
```

Compile the project:

```sh
make
```

Run the project:

```sh
./os_project
```

## Project Structure

```
📁 OS-Project
 ┣ 📂 src         # Source code files
 ┣ 📂 include     # Header files
 ┣ 📂 docs        # Documentation
 ┣ 📂 tests       # Test cases
 ┣ 📜 Makefile    # Build instructions
 ┗ 📜 README.md   # Project description
```

## Usage

Provide specific commands to execute different functionalities, such as:

```sh
./os_project --scheduling FCFS
./os_project --memory paging
```

### Visualizing Paging Replacement

To visualize the paging replacement algorithms, run the following command:

```sh
./os_project --visualize
```

This will launch the interactive tool where you can select the algorithm and input the page reference string to see how the algorithm performs in real-time.

## Contribution

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to the branch and create a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Join Us!

We welcome contributions and feedback! Dive into the code, explore the algorithms, and help us improve this project. Happy coding!
