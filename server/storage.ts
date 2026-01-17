import {
  type InsertProject,
  type Project,
  type InsertInquiry,
  type Inquiry,
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemoryStorage implements IStorage {
  private projects: Project[] = [];
  private inquiries: Inquiry[] = [];
  private projectId = 1;
  private inquiryId = 1;

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.find(p => p.id === id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = {
      id: this.projectId++,
      ...insertProject,
      createdAt: new Date(),
    };
    this.projects.push(project);
    return project;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: this.inquiryId++,
      ...insertInquiry,
      createdAt: new Date(),
    };
    this.inquiries.push(inquiry);
    return inquiry;
  }
}

export const storage = new MemoryStorage();
