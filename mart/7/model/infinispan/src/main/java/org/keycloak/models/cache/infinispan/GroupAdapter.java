
    @Override
    public Long getSubGroupsCount() {
        if (isUpdated()) return updated.getSubGroupsCount();
        GroupModel model = modelSupplier.get();
        return model == null ? null : model.getSubGroupsCount();
    }

    @Override
