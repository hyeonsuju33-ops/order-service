
        rep.setAccess(groupsEvaluator.getAccess(groupTree));
        return rep;
    }

    private static boolean groupMatchesSearchOrIsPathElement(GroupModel group, String search) {
        if (StringUtil.isBlank(search)) {
            return true;
        }
        if (group.getName().contains(search)) {
            return true;
        }
        return group.getSubGroupsStream().findAny().isPresent();
    }
}
