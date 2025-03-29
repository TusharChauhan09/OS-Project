# OS-Project

## Overview
This project is designed as part of an Operating Systems course to implement key OS concepts. It includes functionalities such as process scheduling, memory management, file handling, and inter-process communication.

## Features
- Implementation of CPU scheduling algorithms (FCFS, SJF, Round Robin, etc.).
- Memory management techniques like paging and segmentation.
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

## Contribution
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to the branch and create a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
