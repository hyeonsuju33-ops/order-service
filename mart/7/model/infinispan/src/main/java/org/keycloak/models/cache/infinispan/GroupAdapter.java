
    @Override
    public Long getSubGroupsCount() {
        if (isUpdated()) return updated.getSubGroupsCount();
        return getGroupModel().getSubGroupsCount();
    }

    @Override
