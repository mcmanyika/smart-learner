import { Statement } from 'better-sqlite3';

export interface DatabaseStatements {
    // Auth
    findUserById: Statement<[string], User>;
    findUserByEmail: Statement<[string], User>;
    createUser: Statement<UserCreateData, User>;

    // Students
    listStudents: Statement<[], Student[]>;
    findStudentById: Statement<[string], Student>;

    // Classes
    listClasses: Statement<[], Class[]>;
    findClassById: Statement<[string], Class>;
    createClass: Statement<ClassCreateData, Class>;
    updateClass: Statement<ClassUpdateData, Class>;
    deleteClass: Statement<[string, string], void>;
    enrollStudent: Statement<[string, string], void>;
    unenrollStudent: Statement<[string, string], void>;
    getClassEnrollments: Statement<[string], Enrollment[]>;
    getStudentEnrollments: Statement<[string], Enrollment[]>;

    // ... add other statements as needed
} 