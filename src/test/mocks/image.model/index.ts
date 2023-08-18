export class TestImageModel {
  create = jest.fn().mockResolvedValue({});
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
  find = jest.fn().mockReturnValue([{}]);
  findById = jest.fn();
  findByIdAndUpdate = jest.fn();
}
